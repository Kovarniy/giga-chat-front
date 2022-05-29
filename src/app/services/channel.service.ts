import {Injectable} from '@angular/core';
import {AbstractService} from "./AbstractService";
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {AuthService} from "./auth.service";
import {ApiUrls} from "../models/constants/ApiUrls";
import {Observable} from "rxjs";
import {Channel} from "../models/Channel";
import {Chat} from "../models/Chat";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ChannelService extends AbstractService {

  private channelUrl = this.domain + ApiUrls.channelUrl;

  constructor(protected override httpClient: HttpClient,
              protected override environmentService: EnvironmentService,
              protected override authService: AuthService) {
    super(httpClient, environmentService, authService);
  }

  public getUserChannels(): Observable<Channel[]> {
    return this.httpClient.get<Channel[]>(this.channelUrl, this.requestOptions);
  }

  public createChannel(channel: Channel): Observable<Channel> {
    return this.httpClient.post<Channel>(this.channelUrl, channel, this.requestOptions);
  }

  public updateChannelInfo(channel: Channel): Observable<Channel> {
    return this.httpClient.patch<Channel>(this.channelUrl, channel, this.requestOptions);
  }

  public getChannel(id: string): Observable<Channel> {
    return this.httpClient.get<Channel>(this.channelUrl + id, this.requestOptions);
  }

  public deleteChannel(id: string): Observable<Channel> {
    return this.httpClient.delete<Channel>(this.channelUrl + id, this.requestOptions);
  }

  public getChannelChats(id: string): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(this.channelUrl + id + "/chats", this.requestOptions);
  }

  public leaveChannel(id: string): Observable<any> {
    return this.httpClient.get<any>(this.channelUrl + id + "/leave", this.requestOptions);
  }

  public getChannelUsers(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.channelUrl + id + "/users", this.requestOptions);
  }

  public joinChannel(link: string): Observable<Channel> {
    return this.httpClient.get<Channel>(this.channelUrl + "join/" + link, this.requestOptions);
  }
}
