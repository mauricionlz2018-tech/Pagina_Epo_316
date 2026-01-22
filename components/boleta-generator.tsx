'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface BoletaData {
  nombre_estudiante: string;
  grado: string;
  grupo: string;
  ciclo_escolar: string;
  calificaciones: Array<{
    materia: string;
    calificacion_1: number;
    calificacion_2: number;
    calificacion_3: number;
    inasistencias_1: number;
    inasistencias_2: number;
    inasistencias_3: number;
  }>;
}

export function BoletaGenerator({ data }: { data: BoletaData }) {
  const [isLoading, setIsLoading] = useState(false);

  const descargarBoleta = async () => {
    try {
      setIsLoading(true);

      const { jsPDF } = await import('jspdf');
      
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPos = 25;

      // ============ ENCABEZADO ============
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('ESCUELA PREPARATORIA OFICIAL NÚM. 316', pageWidth / 2, yPos, { align: 'center' });
      yPos += 6;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('SANTA CRUZ DEL TEJOCOTE, SAN JOSÉ DEL RINCÓN', pageWidth / 2, yPos, { align: 'center' });
      yPos += 10;
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('BOLETA INTERNA DE CALIFICACIONES', pageWidth / 2, yPos, { align: 'center' });
      yPos += 15;

      // ============ LÍNEA SEPARADORA ============
      doc.setLineWidth(0.8);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      // ============ INFORMACIÓN DEL ESTUDIANTE ============
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      
      // Primera línea: Nombre
      doc.text('Nombre del alumno:', margin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(String(data.nombre_estudiante || ''), margin + 35, yPos);
      yPos += 7;
      
      // Segunda línea: Grado y Grupo
      doc.setFont('helvetica', 'bold');
      doc.text('Grado:', margin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(String(data.grado || ''), margin + 15, yPos);
      
      doc.setFont('helvetica', 'bold');
      doc.text('Grupo:', margin + 40, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(String(data.grupo || ''), margin + 53, yPos);
      yPos += 7;
      
      // Tercera línea: Ciclo escolar
      doc.setFont('helvetica', 'bold');
      doc.text('Ciclo Escolar:', margin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(String(data.ciclo_escolar || ''), margin + 28, yPos);
      yPos += 15;

      // ============ TABLA DE MATERIAS (SIN COLUMNA TOTAL NI PROMEDIO FINAL) ============
      const materiaColWidth = 85;
      const inasColWidth = 11;
      const evalColWidth = 11;
      
      const inasSecWidth = inasColWidth * 3;
      const evalSecWidth = evalColWidth * 3;
      
      let currentX = margin;

      // ===== ENCABEZADO DE TABLA =====
      doc.setFillColor(220, 220, 220);
      doc.setTextColor(0, 0, 0);
      
      // Columna MATERIAS
      doc.rect(currentX, yPos, materiaColWidth, 12, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('MATERIAS', currentX + materiaColWidth / 2, yPos + 8, { align: 'center' });
      currentX += materiaColWidth;
      
      // Sección INASISTENCIAS - FONDO BLANCO
      doc.setFillColor(255, 255, 255);
      doc.rect(currentX, yPos, inasSecWidth, 6, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.text('INASISTENCIAS', currentX + inasSecWidth / 2, yPos + 4, { align: 'center' });
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.rect(currentX, yPos + 6, inasColWidth, 6, 'D');
      doc.text('1°', currentX + inasColWidth / 2, yPos + 10, { align: 'center' });
      
      doc.rect(currentX + inasColWidth, yPos + 6, inasColWidth, 6, 'D');
      doc.text('2°', currentX + inasColWidth * 1.5, yPos + 10, { align: 'center' });
      
      doc.rect(currentX + inasColWidth * 2, yPos + 6, inasColWidth, 6, 'D');
      doc.text('3°', currentX + inasColWidth * 2.5, yPos + 10, { align: 'center' });
      
      currentX += inasSecWidth;
      
      // Sección EVALUACIONES - FONDO BLANCO
      doc.setFillColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.rect(currentX, yPos, evalSecWidth, 6, 'FD');
      doc.text('EVALUACIONES', currentX + evalSecWidth / 2, yPos + 4, { align: 'center' });
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.rect(currentX, yPos + 6, evalColWidth, 6, 'D');
      doc.text('1°', currentX + evalColWidth / 2, yPos + 10, { align: 'center' });
      
      doc.rect(currentX + evalColWidth, yPos + 6, evalColWidth, 6, 'D');
      doc.text('2°', currentX + evalColWidth * 1.5, yPos + 10, { align: 'center' });
      
      doc.rect(currentX + evalColWidth * 2, yPos + 6, evalColWidth, 6, 'D');
      doc.text('3°', currentX + evalColWidth * 2.5, yPos + 10, { align: 'center' });
      
      yPos += 12;

      // ===== FILAS DE MATERIAS =====
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      
      const materias = data.calificaciones && data.calificaciones.length > 0 
        ? data.calificaciones 
        : [
            'TEMAS SELECTOS DE IGUALDAD',
            'PRACTICA Y COLABORACION CIUDADANA',
            'PROBABILIDAD Y ESTADÍSTICA',
            'INGLÉS',
            'PSICOLOGÍA',
            'ACTIVIDADES ARTÍSTICAS Y CULTURALES',
            'DERECHO Y SOCIEDAD',
            'LA ENERGÍA Y LOS PROCESOS DE LA VIDA',
            'SISTEMAS DE INFORMACIÓN',
            'PROGRAMACIÓN',
            'HABILIDADES SOCIOEMOCIONALES',
            'CONCIENCIA HISTÓRICA'
          ].map(materia => ({
            materia,
            calificacion_1: 0,
            calificacion_2: 0,
            calificacion_3: 0,
            inasistencias_1: 0,
            inasistencias_2: 0,
            inasistencias_3: 0
          }));

      materias.forEach((cal) => {
        if (yPos > pageHeight - 60) {
          doc.addPage();
          yPos = 20;
        }

        currentX = margin;
        const rowHeight = 7;
        
        // Columna de materia
        doc.rect(currentX, yPos, materiaColWidth, rowHeight, 'D');
        const materiaText = cal.materia.length > 40 ? cal.materia.substring(0, 40) + '...' : cal.materia;
        doc.text(materiaText, currentX + 2, yPos + 5);
        currentX += materiaColWidth;
        
        // Inasistencias
        const inas1 = parseInt(String(cal.inasistencias_1)) || 0;
        const inas2 = parseInt(String(cal.inasistencias_2)) || 0;
        const inas3 = parseInt(String(cal.inasistencias_3)) || 0;
        
        doc.rect(currentX, yPos, inasColWidth, rowHeight, 'D');
        doc.text(String(inas1), currentX + inasColWidth / 2, yPos + 5, { align: 'center' });
        
        doc.rect(currentX + inasColWidth, yPos, inasColWidth, rowHeight, 'D');
        doc.text(String(inas2), currentX + inasColWidth * 1.5, yPos + 5, { align: 'center' });
        
        doc.rect(currentX + inasColWidth * 2, yPos, inasColWidth, rowHeight, 'D');
        doc.text(String(inas3), currentX + inasColWidth * 2.5, yPos + 5, { align: 'center' });
        
        currentX += inasSecWidth;
        
        // Evaluaciones
        const calificacion1 = parseFloat(String(cal.calificacion_1)) || 0;
        const calificacion2 = parseFloat(String(cal.calificacion_2)) || 0;
        const calificacion3 = parseFloat(String(cal.calificacion_3)) || 0;
        
        const eval1 = calificacion1 > 0 ? calificacion1.toFixed(1) : '';
        const eval2 = calificacion2 > 0 ? calificacion2.toFixed(1) : '';
        const eval3 = calificacion3 > 0 ? calificacion3.toFixed(1) : '';
        
        doc.rect(currentX, yPos, evalColWidth, rowHeight, 'D');
        doc.text(eval1, currentX + evalColWidth / 2, yPos + 5, { align: 'center' });
        
        doc.rect(currentX + evalColWidth, yPos, evalColWidth, rowHeight, 'D');
        doc.text(eval2, currentX + evalColWidth * 1.5, yPos + 5, { align: 'center' });
        
        doc.rect(currentX + evalColWidth * 2, yPos, evalColWidth, rowHeight, 'D');
        doc.text(eval3, currentX + evalColWidth * 2.5, yPos + 5, { align: 'center' });
        
        yPos += rowHeight;
      });

      yPos += 20;

      // ============ FIRMAS ============
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('FIRMA DEL PADRE, MADRE O TUTOR (A)', pageWidth / 2, yPos, { align: 'center' });
      yPos += 15;
      
      const firmaSpacing = (pageWidth - 2 * margin) / 3;
      
      for (let i = 0; i < 3; i++) {
        const firmaX = margin + firmaSpacing * i;
        const centerX = firmaX + firmaSpacing / 2;
        
        doc.setLineWidth(0.3);
        doc.line(firmaX + 10, yPos, firmaX + firmaSpacing - 10, yPos);
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const evalText = i === 0 ? 'PRIMERA EVALUACIÓN' : i === 1 ? 'SEGUNDA EVALUACIÓN' : 'TERCERA EVALUACIÓN';
        doc.text(evalText, centerX, yPos + 6, { align: 'center' });
      }

      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(
        `Generado el ${new Date().toLocaleDateString('es-MX')} - Sistema de Gestión Escolar`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );

      const fileName = `Boleta_${data.nombre_estudiante.replace(/\s+/g, '_')}_${data.grado}_${data.grupo}.pdf`;
      doc.save(fileName);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar la boleta. Intenta de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            📥 Descargar Boleta en PDF
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Descarga de Boleta</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-600">
              <p className="mb-2"><span className="font-medium">Nombre:</span> {data.nombre_estudiante}</p>
              <p className="mb-2"><span className="font-medium">Grado:</span> {data.grado} - Grupo: {data.grupo}</p>
              <p className="mb-2"><span className="font-medium">Ciclo Escolar:</span> {data.ciclo_escolar}</p>
              <p className="mb-2"><span className="font-medium">Materias:</span> {data.calificaciones?.length || 0}</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={descargarBoleta}
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isLoading ? '⏳ Generando PDF...' : '✅ Descargar Boleta'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}