Prueba Técnica - Validación Contable de Facturas
Descripción

Aplicación desarrollada para validar información contable de facturas a partir de dos archivos CSV:

Archivo de Facturas
Archivo de Contabilidad

La solución realiza validaciones automáticas para identificar inconsistencias contables y generar reportes para análisis.

Funcionalidades
Frontend (Angular)
Carga de archivo CSV de facturas.
Carga de archivo CSV de contabilidad.
Validación de archivos requeridos.
Visualización de resultados.
Resumen ejecutivo:
Total de facturas.
Facturas correctas.
Facturas con inconsistencias.
Filtro por estado.
Exportación de reporte completo.
Exportación de reporte de inconsistencias.
Manejo de errores amigable.
Backend (FastAPI)

Validaciones implementadas:

Facturas duplicadas.
Validación de IVA.
Validación de total de factura.
Registro contable asociado.
Validación de campos obligatorios.
Partida doble (Débito = Crédito).
Validación de estructura de archivos CSV.
Arquitectura
Plain Text
Frontend Angular
|
| HTTP POST
v
Backend FastAPI
|
v
Procesamiento con Pandas
|
v
Resultados JSON
Tecnologías Utilizadas
Frontend
Angular 21
TypeScript
HTML
CSS
Backend
Python 3.9+
FastAPI
Pandas
Uvicorn
Requisitos Previos

Instalar:

Node.js 24 o superior
npm 11 o superior
Python 3.9 o superior

Verificar versiones:

Shell
node -v
Shell
npm -v
Shell
python --version
Instalación Backend

Ubicarse en la carpeta backend:

Shell
cd backend

Crear entorno virtual:

Shell
python -m venv venv

Activar entorno virtual:

Windows
Shell
venv\Scripts\activate
Linux / Mac
Shell
source venv/bin/activate

Instalar dependencias:

Shell
pip install fastapi
Shell
pip install uvicorn
Shell
pip install pandas
Shell
pip install python-multipart

O instalar desde requirements.txt:

Shell
pip install -r requirements.txt
Ejecución Backend

Ubicarse en:

Shell
backend

Ejecutar:

Shell
uvicorn main:app --reload

La API quedará disponible en:

Plain Text
http://localhost:8000

Documentación automática:

Plain Text
http://localhost:8000/docs
Instalación Frontend

Ubicarse en la carpeta frontend:

Shell
cd frontend

Instalar dependencias:

Shell
npm install
Ejecución Frontend

Ejecutar:

Shell
ng serve

o

Shell
npm start

La aplicación quedará disponible en:

Plain Text
http://localhost:4200
Estructura Esperada del Archivo de Facturas

Columnas requeridas:

Plain Text
id_factura
nit_proveedor
fecha_factura
concepto
base_gravable
tarifa_iva
valor_iva
tarifa_retencion
valor_retencion
total_factura
Estructura Esperada del Archivo de Contabilidad

Columnas requeridas:

Plain Text
id_factura
fecha_contabilizacion
cuenta_contable
centro_costo
valor_debito
valor_credito
estado
Validaciones Implementadas
1. Facturas Duplicadas

Identifica registros repetidos por:

Plain Text
id_factura
2. Registro Contable

Verifica que cada factura tenga registro contable asociado.

3. Validación de IVA

Calcula:

Plain Text
base_gravable * tarifa_iva

y compara contra:

Plain Text
valor_iva
4. Validación de Total

Calcula:

Plain Text
base_gravable + valor_iva - valor_retencion

y compara contra:

Plain Text
total_factura
5. Campos Obligatorios

Valida:

Plain Text
nit_proveedor
fecha_factura
concepto
6. Partida Doble

Valida:

Plain Text
SUM(valor_debito)
=
SUM(valor_credito)
Exportación de Resultados

La aplicación permite descargar:

Reporte Completo
Plain Text
Reporte_Completo.csv

Incluye todas las facturas procesadas.

Reporte de Inconsistencias
Plain Text
Reporte_Inconsistencias.csv

Incluye únicamente facturas con inconsistencias detectadas.

Manejo de Errores

La solución valida:

Archivos faltantes.
Formatos incorrectos.
Estructura inválida del CSV.
Columnas obligatorias faltantes.
Errores de comunicación con la API.

Los errores son mostrados al usuario mediante mensajes descriptivos.