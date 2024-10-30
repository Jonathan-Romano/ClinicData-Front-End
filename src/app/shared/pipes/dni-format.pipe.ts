import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dniFormat',
  standalone: true // Hacer que el pipe sea standalone
})
export class DniFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    // Convertir el valor a cadena
    const dniString = value.toString();
    // Agregar puntos cada tres dígitos
    return dniString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
