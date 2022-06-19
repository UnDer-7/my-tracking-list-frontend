import {useHistory} from "react-router-dom";
import { AUTH_REGISTER_PATH, AUTH_PREFIX_PATH, AUTH_SIGN_IN_PATH } from '../../page/auth/AuthRoutes';

export function useRoutes() {
    const history = useHistory();

    return {
        goToAuth: () => history.push(AUTH_PREFIX_PATH),
        goToRegister: () => history.push(AUTH_REGISTER_PATH),
        goToSignIn: () => history.push(AUTH_SIGN_IN_PATH),
        goToHome: () => history.push('/dashboard'),
        goToAccountDetail: () => history.push('/dashboard/account-detail'),
        lists: {
            goToDefaultListPage: () => history.push("/dashboard/lists"),
            goToNewListPage: () => history.push("/dashboard/lists/new"),
        },
    }
}
