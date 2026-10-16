import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  Component,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  archivoFacturas?: File;
  archivoContabilidad?: File;

  resultado: any = null;

  cargando = false;

  mensajeError = '';
  mensajeExito = '';

  filtroEstado = 'Todos';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  cargarFacturas(event: any): void {

    const archivo = event.target.files?.[0];

    if (archivo) {
      this.archivoFacturas = archivo;
      this.mensajeError = '';
    }
  }

  cargarContabilidad(event: any): void {

    const archivo = event.target.files?.[0];

    if (archivo) {
      this.archivoContabilidad = archivo;
      this.mensajeError = '';
    }
  }

  procesar(): void {

    if (!this.archivoFacturas) {

      this.mensajeError =
        'Debe seleccionar el archivo de facturas';

      return;
    }

    if (!this.archivoContabilidad) {

      this.mensajeError =
        'Debe seleccionar el archivo de contabilidad';

      return;
    }

    this.cargando = true;

    this.mensajeError = '';
    this.mensajeExito = '';
    this.resultado = null;

    const formData = new FormData();

    formData.append(
      'facturas',
      this.archivoFacturas
    );

    formData.append(
      'contabilidad',
      this.archivoContabilidad
    );

    this.http.post(
      'http://localhost:8000/procesar',
      formData
    )
    .subscribe({

      next: (response: any) => {

        console.log('RESPUESTA API');
        console.log(response);

        this.resultado = response;

        this.cargando = false;

        this.mensajeExito =
          'Archivos procesados correctamente';

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(error);

        this.cargando = false;

        this.resultado = null;

        this.mensajeError =
          error?.error?.detail ||
          error?.error?.mensaje ||
          'Error procesando archivos';

        this.cdr.detectChanges();
      }
    });
  }

  descargarReporte(): void {

    if (!this.resultado?.detalle?.length) {
      return;
    }

    const encabezado =
      'id_factura,estado,motivos\n';

    const filas = this.resultado.detalle
      .map((item: any) => {

        const motivos =
          item.motivos?.join(' | ') || '';

        return `${item.id_factura},${item.estado},"${motivos}"`;

      })
      .join('\n');

    this.descargarCsv(
      encabezado + filas,
      'Reporte_Completo.csv'
    );
  }

  descargarInconsistencias(): void {

    if (!this.resultado?.detalle?.length) {
      return;
    }

    const inconsistencias =
      this.resultado.detalle.filter(
        (item: any) =>
          item.estado === 'Con inconsistencia'
      );

    const encabezado =
      'id_factura,estado,motivos\n';

    const filas = inconsistencias
      .map((item: any) => {

        const motivos =
          item.motivos?.join(' | ') || '';

        return `${item.id_factura},${item.estado},"${motivos}"`;

      })
      .join('\n');

    this.descargarCsv(
      encabezado + filas,
      'Reporte_Inconsistencias.csv'
    );
  }

  private descargarCsv(
    contenido: string,
    nombreArchivo: string
  ): void {

    const blob = new Blob(
      [contenido],
      {
        type: 'text/csv;charset=utf-8;'
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement('a');

    link.href = url;

    link.download = nombreArchivo;

    link.click();

    window.URL.revokeObjectURL(url);
  }

  reiniciar(): void {

    this.archivoFacturas = undefined;
    this.archivoContabilidad = undefined;

    this.resultado = null;

    this.mensajeError = '';
    this.mensajeExito = '';

    this.cargando = false;

    this.filtroEstado = 'Todos';
  }

  get detalleFiltrado() {

    if (!this.resultado?.detalle) {
      return [];
    }

    let datos = this.resultado.detalle;

    if (this.filtroEstado !== 'Todos') {

      datos = datos.filter(
        (item: any) =>
          item.estado === this.filtroEstado
      );
    }

    const vistos = new Set();

    return datos.filter(
      (item: any) => {

        if (vistos.has(item.id_factura)) {
          return false;
        }

        vistos.add(item.id_factura);

        return true;
      }
    );
  }
}