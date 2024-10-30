import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true // Hacer que el pipe sea standalone
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    const phoneString = value.toString();

    // Formatear el número de teléfono
    if (phoneString.length === 10) {
      return phoneString.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2-$3');
    } else if (phoneString.length === 11) {
      return phoneString.replace(/(\d{2})(\d{5})(\d{4})/, '$1 $2-$3');
    }

    return phoneString; // Devolver sin cambios si no coincide con 10 u 11 dígitos
  }
}
