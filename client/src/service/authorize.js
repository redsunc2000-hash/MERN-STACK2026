//เก็บ username และ password ของผู้ใช้ ลงใน sessionStorage
export const authenticate=(response, next)=>{
    if(typeof window !== "undefined"){
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("user", JSON.stringify(response.data.username));
        
    }
    next();
}


//ดึง token
export const getToken=()=>{
    if(typeof window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"));
        }
    }else{
        return null;
    }
}

// ดึง username
export const getUser=()=>{
    if(typeof window !== "undefined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"));
        }
    }else{
        return null;
    }
}

//ลบ token และ username ออกจาก sessionStorage
export const logout=(next)=>{
    if(typeof window !== "undefined"){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    }
    next();
}