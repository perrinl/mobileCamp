import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doctorpipe',
})
export class DoctorPipe implements PipeTransform {
  transform(doctorList: any[], typeId: number) {
    return doctorList.filter((doctor) => doctor.DoctorType.id == typeId);
  }
}
