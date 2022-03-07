import React from 'react'
import Pic from './emailPic.png'
function Confirm() {

    return(
        <div className="card col-10 col-lg-4 login-card mt-8 hv-center" style={{marginTop: "25px"}}>
           <img src={Pic} alt="description" style={{width: "100px"}}/>
            <h1 >כמעט סיימנו!</h1>
            אשר את כתובת המייל שלך.<br/>
            שלחנו מייל עם קישור לאישור כתובת האימייל שלך. על מנת להשלים את תהליך ההרשמה, אנא לחץ על קישור האישור. אם אינך מקבל הודעת אישור בדוא"ל, אנא בדוק בתיקיית הספאם שלך.
        </div>
    )
    
}
export default Confirm
