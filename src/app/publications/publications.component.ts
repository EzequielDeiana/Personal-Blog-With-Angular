import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Publication } from '../publication';
import { PublicationService } from '../publication.service';
import { PublicationComponent } from './publication/publication.component';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  publications: Publication[] = [];

  constructor(private publicationService: PublicationService) { }

  add(name: string, text: string): void {
    name = name.trim();
    text = text.trim();
    if(!name || !text) {return;}
    this.publicationService.addPublication({name, text} as Publication).subscribe(publication => {this.publications.push(publication);
    })
  }
  
  getPublications(): void{
    this.publicationService.getPublications().subscribe(publications => this.publications = publications);
  }

  delete(publication: Publication): void {
    this.publications = this.publications.filter(p => p !== publication);
    this.publicationService.deletePublication(publication.id).subscribe((response) => {console.log("deleted " + publication.id)});
  }

  getIndex(publication: Publication){
    return this.publications.indexOf(publication);
  }
  
  ngOnInit(): void {
    this.getPublications();
  }

}
