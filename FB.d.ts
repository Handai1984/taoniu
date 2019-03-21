declare class FB {

    static init(params: {
        appId?: string, version?: string, cookie?: boolean, status?: boolean,
        xfbml?: boolean, frictionlessRequests?: boolean, hideFlashCallback?: Function
    }): void

    static api(path: string, callback: (response) => void): void
    static api(path: string, method: Method, callback: (response) => void): void
    static api(path: string, params: any = {}, callback: (response) => void): void
    static api(path: string, method: Method, params: any = {}, callback: (response) => void): void

    static ui(params: any, callback: (response) => void): void


    /**
     * Login Methods
     */
    static getLoginStatus(callback: (response: {
        status: LoginStatus,
        authResponse: AuthResponse
    }) => void): void

    static login(cb: (response) => void, opts?: {
        auth_type?: string,
        scope?: string,
        return_scopes?: boolean,
        enable_profile_selector?: boolean,
        profile_selector_ids?: string
    }): void

    static login(opts?: {
        auth_type?: string,
        scope?: string,
        return_scopes?: boolean,
        enable_profile_selector?: boolean,
        profile_selector_ids?: string
    }): void

    static logout(cb: (response) => void): void

    static getAuthResponse(): AuthResponse

    /**
     * Event Handling Methods
     */
    static AppEvents: FB.AppEvents
    static Event: FB.Event
    static XFBML: FB.XFBML

}

declare class AuthResponse {
    static accessToken: string
    static expiresIn: string
    static signedRequest: string
    static userID: string
}

declare namespace FB {
    interface AppEvents {
        LogEvent(eventName: FBAppEventName, valueToSum?: number, parameters?: any)

        logPurchase(purchaseAmount: number, currency: string, parameters?: any)

        activateApp(): void

        setUserID(userID: string): void

        getUserID(): string

        clearUserID(): void

        updateUserProperties(params: { [key: string]: string | number }, cb?: (response: any) => void): void,

        setAppVersion(appVersion: string): void

        getAppVersion(): string

        clearAppVersion(): void
    }

    interface Event {
        subscribe(event: FBEvent, callback: (response?: AuthResponse) => void): void

        unsubscribe(event: FBEvent, callback: (response?: AuthResponse) => void): void
    }

    interface XFBML {
        parse(dom?: DOMElement, cb: () => void)
    }

    //
    // declare namespace Canvas {
    //     scrollTo()
    //
    //     setAutoGrow()
    //
    //     setSize()
    //
    //     setUrlHandler()
    //
    //     setDoneLoading()
    //
    //     startTimer()
    //
    //     stopTimer()
    // }

}

type LoginStatus = 'connected' | 'authorization_expired' | 'not_authorized' | 'unknown';
type  Method = 'get' | 'post' | 'delete';

type FBAppEventName =
    "ACHIEVED_LEVEL"
    | "ADDED_PAYMENT_INFO"
    | "ADDED_TO_CART"
    | "ADDED_TO_WISHLIST"
    | "COMPLETED_REGISTRATION"
    | "COMPLETED_TUTORIAL"
    | "INITIATED_CHECKOUT"
    | "RATED"
    | "SEARCHED"
    | "SPENT_CREDITS"
    | "UNLOCKED_ACHIEVEMENT"
    | "VIEWED_CONTENT";

declare enum FBEvent {
    AUTH_CHANGE = "auth.authResponseChange",
    AUTH_STATUS_CHANGE = "auth.statusChange",
    AUTH_LOGIN = "auth.login",
    AUTH_LOGOUT = "auth.logout",
    XFBML_RENDER = "xfbml.render"
}