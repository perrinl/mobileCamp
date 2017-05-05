import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documentpipetype',
})
export class DocumentPipeType implements PipeTransform {
  transform(documentList: any[], typeId: number, filterType: number) {
    console.log(filterType);
    if (filterType == 0)
      return documentList.filter((document) => document.DoctorId == typeId);
    else if (filterType == 1)
      return documentList.filter((document) => document.DocumentTypeId == typeId);
    else if (filterType == 2)
      return documentList.filter((document) => document.DocumentNatureId == typeId);
    else
      return documentList;
  }
}

@Pipe({
  name: 'documentpipenature',
})
export class DocumentPipeNature implements PipeTransform {
  transform(documentList: any[], typeId: number) {
    return documentList.filter((document) => document.DocumentNatureId == typeId);
  }
}

@Pipe({
  name: 'documentpipedocteur',
})
export class DocumentPipeDocteur implements PipeTransform {
  transform(documentList: any[], typeId: number) {
    return documentList.filter((document) => document.DoctorId == typeId);
  }
}
