export const firstLetterUpperCase = (e:string) => { 
    const value = e.substring(0).toUpperCase() + e.substring(1);
    console.log(value);
    return value; 
}