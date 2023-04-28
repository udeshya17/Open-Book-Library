import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})
export class TrendingSubjectsComponent implements OnInit {

  isLoading: boolean = true;

  subjectName: string = '';

  allBooks: Book[] = [];

  booksList: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
    private bookService: BookService
  ) { }

  getAllBooks() {
    this.subjectsService.getAllBooks(this.subjectName).subscribe((data) => {
      this.allBooks = data ?.works;
      // this.subjectsArray = data;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.isLoading = true;
      this.getAllBooks();

      this.isLoading = true;
      this.subjectName = this.route.snapshot.paramMap.get("name")!;
      this.bookService
        .getBooksBySubject(this.subjectName)
        .subscribe((response: any) => {
          this.booksList = response.books;
          this.isLoading = false;
        });
    });
  }
}
