/**
 * @see <a href="https://github.com/keycloak/keycloak-documentation/blob/main/securing_apps/topics/oidc/javascript-adapter.adoc">
 *     keycloak doc
 *     </a>
 */
import Keycloak from 'keycloak-js';

const kc = Keycloak({
    url: 'http://localhost:8180/auth/',
    realm: 'dev-local',
    clientId: 'my-tracking-list-frontend',
});

function initKeycloak(onAuthenticatedCallback: () => void): void {
    kc.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        pkceMethod: 'S256',
    })
        .then(onAuthenticatedCallback)
        .catch(console.error);
}

export const AuthService = {
    initKeycloak,
    doLogin: kc.login,
    doLogout: kc.logout,
    isLoggedIn: () => !!kc.token,
    getToken: () => kc.token,
    updateToken: (successCallback: () => void) => kc
        .updateToken(5)
        .then(successCallback)
        .catch(kc.login)
};
