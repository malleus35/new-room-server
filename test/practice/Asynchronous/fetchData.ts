export const fetchCallBack = (callback) => {
    callback("peanut butter");
};

export const fetchData = async () => {
    return "peanut butter";
};

export const fetchError = async () => {
    return new Promise((resolve, reject) => {
        reject("error");
    });
};
