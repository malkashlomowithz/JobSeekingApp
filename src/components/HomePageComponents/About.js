import React from 'react'
import { withRouter } from 'react-router-dom';
import './About.css'


function about(props) {

  const redirectToRegister = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
  });
    
    props.history.push('/register');  
  }
  return (
    <div className=' hv-center about'>
      <h2 className ='how'>  איך האתר הזה יכול לעזור לכם בחיפוש עבודה? </h2>
      <p className = 'text'>ישנו כלל ברזל שכל מחפש עבודה יודע והוא: חובה לתעד כל פעם שאתם מגישים מועמדות וככה תהיו מוכנים לכל רעיון טלפוני וגם תוכלו לבצע פולו אפ בקלות. הבעיה מתחילה כאשר אנו מגישים מועומדות למשרה מסוימת ולא בדיוק יודעים איפה לתעד אז פתחנו קובץ אקסל והוא נעלם אז שוב התחלנו חדש ושיפצנו את הקורות חיים ולא זכרנו איפה אחסנו אותו וכך הלא, וכך הלאה. הבלגן חוגג וכל העסק של חיפוש עבודה הופך להיות ממש סיוט.
עם האפליקציה החכמה הזו הכל הופך להיות קל, מהיר ויעיל כל מה שעליכם לעשות הוא תהליך<span className = "link" onClick={redirectToRegister}> הרשמה </span>קל והופ אתם בפנים!!</p>
    </div>
    
  )
}

export default withRouter(about)
