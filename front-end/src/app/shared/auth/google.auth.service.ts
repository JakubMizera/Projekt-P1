import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private oauthService: OAuthService) {
    this.configureOAuth();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    // Optional: Listen for OAuth events such as token received or error
    this.oauthService.events
      .pipe(filter(e => e instanceof OAuthErrorEvent))
      .subscribe(e => console.error(e));
  }

  private configureOAuth(): void {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      redirectUri: window.location.origin,
      clientId: environment.googleClientId,
      responseType: 'token id_token',
      scope: 'openid profile email',
      showDebugInformation: true, // for debugging purposes
      strictDiscoveryDocumentValidation: false
    };

    this.oauthService.configure(authConfig);
  }

  public login(): void {
    this.oauthService.initLoginFlow();
  }

  public logout(): void {
    this.oauthService.logOut();
  }

  public get identityClaims(): any {
    return this.oauthService.getIdentityClaims();
  }

  public get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
