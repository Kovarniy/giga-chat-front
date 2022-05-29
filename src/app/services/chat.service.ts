import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {ApiUrls} from "../models/constants/ApiUrls";
import {Chat} from "../models/Chat";
import {AbstractService} from "./AbstractService";
import {Message} from "../models/Message";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ChatService extends AbstractService {

  constructor(protected override httpClient: HttpClient,
              protected override environmentService: EnvironmentService,
              protected override authService: AuthService) {
    super(httpClient, environmentService, authService);
  }

  public getUserChats(): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(this.domain + ApiUrls.chatUrl, this.requestOptions);
  }

  public getUserPrivateChats(): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(this.domain + ApiUrls.chatUrl + 'private', this.requestOptions);
  }

  public getChat(id: String): Observable<Chat> {
    return this.httpClient.get<Chat>(this.domain + ApiUrls.chatUrl + id, this.requestOptions);
  }

  public createChat(chat: Chat): Observable<Chat> {
    return this.httpClient.post<Chat>(this.domain + ApiUrls.chatUrl, chat, this.requestOptions);
  }

  public deleteChat(id: string): Observable<Chat> {
    return this.httpClient.delete<Chat>(this.domain + ApiUrls.chatUrl + id, this.requestOptions);
  }

  public updateChat(chat: Chat): Observable<Chat> {
    return this.httpClient.patch<Chat>(this.domain + ApiUrls.chatUrl, chat, this.requestOptions);
  }

  public getChatMessages(id: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.domain + ApiUrls.chatUrl + id + "/messages", this.requestOptions);
  }

  public getChatUsers(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.domain + ApiUrls.chatUrl + id + "/users", this.requestOptions);
  }
}
