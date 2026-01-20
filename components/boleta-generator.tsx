'use client';

import { useState, useEffect } from 'react';

interface BeletaData {
  nombre_estudiante: string;
  grado: string;
  semestre: string;
  calificaciones: Array<{
    materia: string;
    calificacion: number;
  }>;
  ciclo_escolar: string;
}

export function BeletaGenerator({ data }: { data: BeletaData }) {
  const [isLoading, setIsLoading] = useState(false);

  const calcularPromedio = () => {
    if (data.calificaciones.length === 0) return '0.00';
    const suma = data.calificaciones.reduce((acc, cal) => acc + cal.calificacion, 0);
    return (suma / data.calificaciones.length).toFixed(2);
  };

  const descargarBoleta = async () => {
    try {
      setIsLoading(true);
      
      // Cargar html2pdf dinámicamente
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Crear elemento temporal con la boleta
      const element = document.createElement('div');
      element.style.padding = '40px';
      element.style.fontFamily = 'Arial, sans-serif';
      element.style.fontSize = '12px';
      element.style.backgroundColor = 'white';
      element.style.color = 'black';
      element.style.maxWidth = '800px';
      element.style.margin = '0 auto';

      // Contenido de la boleta
      element.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid black; padding-bottom: 15px;">
          <h1 style="font-weight: bold; font-size: 14px; margin: 5px 0;">ESCUELA PREPARATORIA OFICIAL NÚM. 316</h1>
          <p style="font-size: 11px; margin: 3px 0;">SANTA CRUZ DEL TEJOLOTE, SAN JOSÉ DEL RINCÓN</p>
          <p style="font-weight: bold; font-size: 12px; margin: 3px 0;">BOLETA INTERNA DE CALIFICACIONES</p>
        </div>

        <div style="margin-bottom: 15px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; font-size: 11px;">
          <div>
            <p style="font-weight: bold; margin: 0 0 5px 0;">Nombre del alumno:</p>
            <p style="margin: 0;">${data.nombre_estudiante}</p>
          </div>
          <div>
            <p style="font-weight: bold; margin: 0 0 5px 0;">Grado:</p>
            <p style="margin: 0;">${data.grado}</p>
          </div>
          <div>
            <p style="font-weight: bold; margin: 0 0 5px 0;">Semestre:</p>
            <p style="margin: 0;">${data.semestre}</p>
          </div>
        </div>

        <div style="margin-bottom: 15px; font-size: 11px;">
          <p style="font-weight: bold; margin: 0;"><span style="font-weight: bold;">Ciclo Escolar:</span> ${data.ciclo_escolar}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11px; border: 2px solid black;">
          <thead>
            <tr style="border: 2px solid black;">
              <th style="border: 1px solid black; background-color: #e0e0e0; padding: 8px; text-align: left; font-weight: bold;">MATERIAS</th>
              <th style="border: 1px solid black; background-color: #e0e0e0; padding: 8px; width: 100px; font-weight: bold;">CALIFICACIÓN</th>
              <th style="border: 1px solid black; background-color: #e0e0e0; padding: 8px; width: 100px; font-weight: bold;">OBSERVACIONES</th>
            </tr>
          </thead>
          <tbody>
            ${data.calificaciones.map(cal => `
              <tr style="border: 1px solid black;">
                <td style="border: 1px solid black; padding: 8px;">${cal.materia}</td>
                <td style="border: 1px solid black; padding: 8px; text-align: center; font-weight: bold;">${cal.calificacion.toFixed(1)}</td>
                <td style="border: 1px solid black; padding: 8px; text-align: center;">
                  ${cal.calificacion >= 8 ? '✓' : cal.calificacion >= 6 ? '○' : ''}
                </td>
              </tr>
            `).join('')}
            <tr style="border: 2px solid black; font-weight: bold; background-color: #f5f5f5;">
              <td style="border: 1px solid black; padding: 8px; text-align: right;">PROMEDIO PARCIAL:</td>
              <td style="border: 1px solid black; padding: 8px; text-align: center; font-weight: bold;">${calcularPromedio()}</td>
              <td style="border: 1px solid black; padding: 8px;"></td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; font-size: 11px; text-align: center;">
          <div>
            <div style="height: 50px; margin-bottom: 10px;"></div>
            <p style="border-top: 1px solid black; margin: 0; padding-top: 5px;">PRIMERA EVALUACIÓN</p>
          </div>
          <div>
            <div style="height: 50px; margin-bottom: 10px;"></div>
            <p style="border-top: 1px solid black; margin: 0; padding-top: 5px;">SEGUNDA EVALUACIÓN</p>
          </div>
          <div>
            <div style="height: 50px; margin-bottom: 10px;"></div>
            <p style="border-top: 1px solid black; margin: 0; padding-top: 5px;">TERCERA EVALUACIÓN</p>
          </div>
        </div>

        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid black; font-size: 11px; text-align: center;">
          <p style="margin: 0;">FORMA DEL PADRE, MADRE O TUTOR (A)</p>
        </div>
      `;

      const options = {
        margin: 10,
        filename: `Boleta_${data.nombre_estudiante.replace(/\s+/g, '_')}_${data.grado}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'letter' },
      };

      html2pdf().set(options).from(element).save();
      setIsLoading(false);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar la boleta. Intenta de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={descargarBoleta}
        disabled={isLoading}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading ? '⏳ Generando...' : '📥 Descargar Boleta en PDF'}
      </button>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-600">
        <p>✓ Nombre: {data.nombre_estudiante}</p>
        <p>✓ Grado: {data.grado}</p>
        <p>✓ Materias: {data.calificaciones.length}</p>
        <p>✓ Promedio: {calcularPromedio()}</p>
      </div>
    </div>
  );
}
