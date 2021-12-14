import { Component, ElementRef, EventEmitter,Output, ViewChild } from '@angular/core';

@Component({
  selector: 'dblab-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @ViewChild('audioOption') audioPlayerRef!: ElementRef;
  @Output() updatedFilterString = new EventEmitter<string>();
  @Output() fillAllTables = new EventEmitter<null>();
  @Output() truncAllTables = new EventEmitter<null>();
  @Output() dropDb = new EventEmitter<null>();
  @Output() createDb = new EventEmitter<null>();
  audioPlayed = false;
  filterTableString = "";

  onAudioPlay(){
    this.audioPlayerRef.nativeElement.play();
    this.audioPlayed = true;
    this.audioPlayerRef.nativeElement.onended = () => {this.audioPlayed = false}
  }

  emitNewFilter() {
    this.updatedFilterString.emit(this.filterTableString);
  }

  emitFillAllTables() {
    this.fillAllTables.emit();
  }

  emitTruncAllTables() {
    this.truncAllTables.emit();
  }

  emitDeleteDb() {

    this.dropDb.emit();
  }

  emitCreateDb() {
    this.createDb.emit();
  }

}
