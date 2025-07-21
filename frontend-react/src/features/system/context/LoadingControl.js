let control = {
    showLoading: () => { },
    hideLoading: () => { },
};
export const setLoadingControl = (externalControl) => {
    control = externalControl;
};
export const getLoadingControl = () => control;
