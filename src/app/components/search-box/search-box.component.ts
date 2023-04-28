import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

interface Book {
  title: string;
  author_name: string;
  publish_year: number;
}

@Component({
  selector: 'front-end-internship-assignment-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  isLoading: boolean = false;
  searchQuery = '';
  searchType = 'title'; // Default search type
  books: Book[] = [];
  currentPage = 1;
  pageSize = 10;
  totalResults = 0;

  @ViewChild('searchInput') searchInputRef!: ElementRef;
  @Output() search: EventEmitter<{ query: string, type: string }> = new EventEmitter();


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.searchBooks();
  }

  ngAfterViewInit() {
    const inputElement = this.searchInputRef.nativeElement as HTMLInputElement;
    inputElement.focus();
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchBooks();

  }

  searchBooks() {
    if (this.searchQuery.trim() !== '') {
      this.search.emit({ query: this.searchQuery, type: this.searchType });
    }

    const offset = (this.currentPage - 1) * this.pageSize;
    const query = this.searchQuery.trim() || 'the lord of the rings';

    this.isLoading = true;
    this.api.apicall(query, parseInt(this.searchType), this.pageSize, offset).subscribe((data: any) => {
      console.log(data);
      this.books = data.docs.map((book: any) => {
        return {
          title: book.title,
          author_name: book.author_name ?.join(', '),
          publish_year: book.first_publish_year
        };
      });
      this.totalResults = data.numFound;

      this.isLoading = false;

    }, error => {
      console.log(error);
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.searchBooks();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchBooks();
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.searchBooks();
    }
  }

  get totalPages() {
    return Math.ceil(this.totalResults / this.pageSize);
  }

  getPageNumbers() {
    let pages = [];
    let start = Math.max(1, this.currentPage - 3);
    let end = Math.min(this.totalPages, this.currentPage + 3);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
