import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { take, mergeMap, catchError } from 'rxjs/operators'
import { Doc } from "../models";
import { DataService, LibraryService } from "../services";

@Injectable({ providedIn: 'root' })
export class SearchResolver {
    constructor(private service: LibraryService, private dataService: DataService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Doc[]> | Promise<Doc[]> | any {

        return this.service.getAllSavedBaselineDocs().pipe(catchError(err => {
            return EMPTY
        }), mergeMap(res => {
            let docs = [];
            res.data.slice().reverse().forEach(d => {
                docs.push(new Doc(d));
            });
            return of(docs);
        }));
    }
}
