import {useHistory} from "react-router-dom";

export function useRoutes() {
    const history = useHistory();

    return {
        goToSignIn: () => history.push('/auth'),
        goToHome: () => history.push('/dashboard'),
        goToAccountDetail: () => history.push('/dashboard/account-detail'),
        lists: {
            goToDefaultListPage: () => history.push("/dashboard/lists"),
            goToNewListPage: () => history.push("/dashboard/lists/new"),
        },
    }
}
