import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Publication } from '../../publication';
import { PublicationService } from '../../publication.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  @Input() publication?: Publication;
  @Input() publicationsFather: Publication[];
  @Input() index: number;
  @Output("deleteMethod") deleteMethod: EventEmitter<any> = new EventEmitter();
  @Output("getElements") getElements: EventEmitter<any> = new EventEmitter()

  deleteBtn(){
    this.deleteMethod.emit();
  }


  textSpan = false;
  textArea = true;

  getIndex(){
    let index = Number(this.publication?.id);
    return index;
  }

  submitToSpan(){
    this.textArea = true;
    this.textSpan = false;
  }

  submitToTextArea(){
    this.textSpan = true;
    this.textArea = false;
  }

  constructor(private publicationService: PublicationService, private route: ActivatedRoute, private location:Location) { }

  saveChange(): void {
    if(this.publication){
      this.publicationService.modifyPublication(this.publication).subscribe();
    }
  }

  ngOnInit(): void {
    this.getElements;
  }

}
