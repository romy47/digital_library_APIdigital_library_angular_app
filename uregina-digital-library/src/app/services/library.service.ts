import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Facet, AllFacets, Task, Doc, Search } from '../Models';
import { AuthService } from './auth.service';
import * as api from './../../environments/custom/prod-aws';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  // For the baseline
  public addBaselineSearch(searchQuery: string, totalDocuments?: number, docBrowsed?: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(api.API_PATH + 'baseline/search', {
      searchQuery: searchQuery ? searchQuery.trim() : '',
      totalDocuments: totalDocuments ? totalDocuments : 0,
      documentsBrowsed: docBrowsed ? docBrowsed : 0,
      createdBy: this.authService.getCurrentUserData()._id
    }, httpOptions);
  }

  public getAllBaselineSearches(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
    return this.http.post(api.API_PATH + 'baseline/search/all', {
      userId: this.authService.getCurrentUserData()._id
    },
      httpOptions
    );
  }

  public deleteBaselineSearchHistory(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const createdBy = this.authService.getCurrentUserData()._id
    return this.http.post(api.API_PATH + 'baseline/search/delete', {
      id: id ? id.trim() : '',
      createdBy: createdBy ? createdBy.trim() : '',
    }, httpOptions);
  }

  public deleteBatchBaselineSearchHistory(ids: string[] = []): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const createdBy = this.authService.getCurrentUserData()._id
    return this.http.post(api.API_PATH + 'baseline/search/delete/batch', {
      ids: ids,
      createdBy: createdBy ? createdBy.trim() : '',
    }, httpOptions);
  }

  public addBaselineSavedSearch(searchQuery: string, totalDocuments?: number, docBrowsed?: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(api.API_PATH + 'baseline/savedsearch', {
      searchQuery: searchQuery ? searchQuery.trim() : '',
      totalDocuments: totalDocuments ? totalDocuments : 0,
      documentsBrowsed: docBrowsed ? docBrowsed : 0,
      createdBy: this.authService.getCurrentUserData()._id
    }, httpOptions);
  }

  public addBatchBaselineSavedSearch(searches: Search[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    searches.forEach(s => {
      s['createdBy'] = this.authService.getCurrentUserData()._id;
    });
    return this.http.post(api.API_PATH + 'baseline/savedsearch/batch', {
      searches
    }, httpOptions);
  }

  public getAllSavedBaselineSearches(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
    return this.http.post(api.API_PATH + 'baseline/savedsearch/all', {
      userId: this.authService.getCurrentUserData()._id
    },
      httpOptions
    );
  }

  public deleteBaselineSavedSearch(searchId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const createdBy = this.authService.getCurrentUserData()._id
    return this.http.post(api.API_PATH + 'baseline/savedsearch/delete', {
      id: searchId ? searchId.trim() : '',
      createdBy: createdBy ? createdBy.trim() : '',
    }, httpOptions);
  }

  public deleteBatchBaselineSavedSearch(ids: string[] = []): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const createdBy = this.authService.getCurrentUserData()._id
    return this.http.post(api.API_PATH + 'baseline/savedsearch/delete/batch', {
      ids: ids,
      createdBy: createdBy ? createdBy.trim() : '',
    }, httpOptions);
  }


  public addBaselineSavedDoc(doc: Doc): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    doc.createdBy = this.authService.getCurrentUserData()._id;
    return this.http.post(api.API_PATH + 'baseline/doc',
      doc
      , httpOptions);
  }

  public addBatchBaselineSavedDoc(docs: Doc[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    docs.forEach(s => {
      s['createdBy'] = this.authService.getCurrentUserData()._id;
    });
    return this.http.post(api.API_PATH + 'baseline/doc/batch', {
      docs
    }, httpOptions);
  }

  public addLabelToDoc(label: string, savedRecordId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(api.API_PATH + 'baseline/doc/label', {
      label: label,
      docId: savedRecordId,
      createdBy: this.authService.getCurrentUserData()._id
    }, httpOptions);
  }

  public addLabelToDocBatch(label: string, savedRecordIds: string[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(api.API_PATH + 'baseline/doc/label/batch', {
      label: label,
      docIds: savedRecordIds,
      createdBy: this.authService.getCurrentUserData()._id
    }, httpOptions);
  }

  public removeLabelFromDoc(label: string, savedRecordId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(api.API_PATH + 'baseline/doc/label/delete', {
      label: label,
      docId: savedRecordId,
      createdBy: this.authService.getCurrentUserData()._id
    }, httpOptions);
  }

  public removeLabelFromDocBatch(label: string, savedRecordIds: string[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(api.API_PATH + 'baseline/doc/label/batch/delete', {
      label: label,
      docIds: savedRecordIds,
      createdBy: this.authService.getCurrentUserData()._id
    }, httpOptions);
  }

  public getAllSavedBaselineDocs(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
    return this.http.post(api.API_PATH + 'baseline/doc/all', {
      userId: this.authService.getCurrentUserData()._id
    },
      httpOptions
    );
  }

  public deleteBaselineSavedDoc(docId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const createdBy = this.authService.getCurrentUserData()._id
    return this.http.post(api.API_PATH + 'baseline/doc/delete', {
      id: docId ? docId.trim() : '',
      createdBy: createdBy ? createdBy.trim() : '',
    }, httpOptions);
  }

  deleteBatchBaselineSavedDocs(ids: string[] = []): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const createdBy = this.authService.getCurrentUserData()._id
    return this.http.post(api.API_PATH + 'baseline/doc/delete/batch', {
      ids: ids,
      createdBy: createdBy ? createdBy.trim() : '',
    }, httpOptions);
  }





  // *********************************************************************************************
  //********* **************** ********** *********** ********** ************ ************ ***** */
  // From the prototype ##########################################################################
  public getSearchResult(query: string, facetedQueryString?: string, offset = 0): Observable<any> {
    let params = new HttpParams();
    params = params.append('q', 'any,contains,' + query);
    params = params.append('offset', offset.toString());

    if (facetedQueryString) {
      params = params.append('multiFacets', facetedQueryString);
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
    // console.log(params);
    return this.http.get(api.API_PATH + 'url', {
      params: params,
      headers: headers
    });
  }


  // public addTask(taskName: string): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.post(api.API_PATH + 'task', {
  //     name: taskName ? taskName.trim() : '',
  //     searches: [],
  //     createdBy: this.authService.getCurrentUserData()._id
  //   }, httpOptions);
  // }

  public createUser(userName: string, orcid: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(api.API_PATH + 'user', {
      userName: userName ? userName.trim() : '',
      orcid: orcid
    }, httpOptions);
  }

  // public addSavedDoc(doc: any, taskId: string, searchId: string): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.post(api.API_PATH + 'saved', {
  //     taskId: taskId ? taskId.trim() : '',
  //     searchId: searchId ? searchId.trim() : '',
  //     doc: doc
  //   }, httpOptions);
  // }


  // public getAllTasks(): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
  //   return this.http.post(api.API_PATH + 'task/all', {
  //     userId: this.authService.getCurrentUserData()._id
  //   },
  //     httpOptions
  //   );
  // }

  // public getSearch(taskId: string, searchId: string): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.append('taskId', taskId);
  //   params = params.append('searchId', searchId);
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
  //   return this.http.get(api.API_PATH + 'search', {
  //     headers: headers,
  //     params: params
  //   });
  // }


  // public getTaskSearchHistory(taskId: string): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.append('taskId', taskId);
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
  //   return this.http.get(api.API_PATH + 'task/searches', {
  //     headers: headers,
  //     params: params
  //   });
  // }

  // public getTask(taskId: string): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.append('taskId', taskId);
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     params: params
  //   };
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
  //   return this.http.post(api.API_PATH + 'task_', {
  //     userId: this.authService.getCurrentUserData()._id
  //   }, httpOptions);
  // }

  // public updateDocumentBrowsedCount(taskId: string, searchId: string, documentsBrowsed: number): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.put(api.API_PATH + 'search/docbrowsed', {
  //     taskId: taskId,
  //     searchId: searchId,
  //     documentsBrowsed: documentsBrowsed
  //   }, httpOptions);
  // }

  // public deleteTask(task: Task): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.post(api.API_PATH + 'task/delete', {
  //     taskId: task._id ? task._id.trim() : '',
  //   }, httpOptions);
  // }

  // public deleteSavedDoc(taskId: string, searchId: string, docId: string): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.post(api.API_PATH + 'saved/delete', {
  //     docId: docId ? docId.trim() : '',
  //     searchId: searchId ? searchId.trim() : '',
  //     taskId: taskId ? taskId.trim() : '',
  //   }, httpOptions);
  // }

  // public EditTask(task: Task): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.post(api.API_PATH + 'task/edit', {
  //     task: { _id: task._id, name: task.name },
  //   }, httpOptions);
  // }

  getArticleThumbnail(doi: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('access_token', '66db3295-b03a-4a98-ae87-3473b6d85542');
    params = params.append('include', 'journal');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get('https://public-api.thirdiron.com/public/v1/libraries/172/articles/doi/' + doi, {
      headers: headers,
      params: params
    });
  }
  getJournalThumbnail(issn: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('issns', issn);
    params = params.append('access_token', '66db3295-b03a-4a98-ae87-3473b6d85542');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get('https://public-api.thirdiron.com/public/v1/libraries/172/search', {
      headers: headers,
      params: params
    });
  }

  // https://public-api.thirdiron.com/public/v1/libraries/172/articles/doi/10.1038%2Fnn.2583?include=journal&access_token=66db3295-b03a-4a98-ae87-3473b6d85542
}

