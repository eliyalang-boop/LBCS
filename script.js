// script.js - JS מלא לאתר LBCS
// כולל: תפריט המבורגר, לוח חודשי, ודוח יומי עם רשימת כניסות

// -----------------------------
// 1. תפריט המבורגר
// -----------------------------
const hamburger = document.getElementById("hamburger"); // בוחר את כפתור ההמבורגר
const navLinks = document.getElementById("nav-links");  // בוחר את תפריט הקישורים

hamburger.addEventListener("click", function() { // מאזין ללחיצה על ההמבורגר
    navLinks.classList.toggle("open");          // פותח/סוגר את התפריט
    hamburger.classList.toggle("active");       // משנה את עיצוב הכפתור בזמן לחיצה
});

// -----------------------------
// 2. לוח חודשי
// -----------------------------
function createCalendar() {
    const calendarTable = document.getElementById("calendar-table"); // בוחר את טבלת הלוח
    if (!calendarTable) return; // אם אין טבלה בדף — יוצא מהפונקציה

    calendarTable.innerHTML = ""; // מנקה כל תוכן קודם מהטבלה

    const today = new Date(); // תאריך של היום בפועל
    const year = today.getFullYear(); // השנה הנוכחית
    const month = today.getMonth();   // החודש הנוכחי (0–11)

    const firstDay = new Date(year, month, 1);       // היום הראשון בחודש
    const lastDay = new Date(year, month + 1, 0);    // היום האחרון בחודש

    // מערכים עם שמות חודשים וימים
    const monthNames = ["January","February","March","April","May","June",
                        "July","August","September","October","November","December"];
    const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const monthTitle = document.getElementById("month-title"); // אלמנט כותרת החודש
    if (monthTitle) monthTitle.textContent = monthNames[month] + " " + year; // הצגת שם החודש והשנה

    // יצירת שורת כותרות הימים
    const headerRow = document.createElement("tr"); // יצירת שורת כותרת חדשה
    for (let d = 0; d < 7; d++) { // לולאה לכל ימות השבוע
        const th = document.createElement("th"); // יצירת תא כותרת
        th.textContent = dayNames[d];            // הצגת שם היום
        headerRow.appendChild(th);               // הוספת התא לשורה
    }
    calendarTable.appendChild(headerRow); // הוספת השורה לטבלה

    // מילוי ימי החודש
    let date = 1; // מתחיל מהיום הראשון
    const numRows = Math.ceil((firstDay.getDay() + lastDay.getDate()) / 7); // חישוב כמה שורות צריך

    for (let i = 0; i < numRows; i++) { // לולאה לשורות
        const tr = document.createElement("tr"); // יצירת שורה
        for (let j = 0; j < 7; j++) { // לולאה לתאים (ימים)
            const td = document.createElement("td"); // יצירת תא חדש

            if (i === 0 && j < firstDay.getDay()) {
                td.textContent = ""; // תאים ריקים לפני תחילת החודש
            } else if (date > lastDay.getDate()) {
                td.textContent = ""; // תאים ריקים אחרי סוף החודש
            } else {
                td.textContent = date; // מציג את מספר היום

                // סימון היום הנוכחי
                if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    td.classList.add("today"); // מוסיף עיצוב מיוחד ליום הנוכחי
                    
                }

                td.style.cursor = "pointer"; // מציין שאפשר ללחוץ על התא

                // ⚡ תיקון חשוב — שמירה על ערך יום קבוע לכל תא
                const currentDate = date; // יוצר עותק של הערך (ולא משתמש ב-date שמשתנה בלולאה)

                td.addEventListener("click", function() {
                    // יוצר תאריך לפי השנה, החודש והיום של התא שנלחץ
                    const selectedDate = new Date(year, month, currentDate);

                    // שומר את התאריך ב-localStorage כדי להשתמש בו בעמוד אחר
                    localStorage.setItem("selectedDate", selectedDate.toISOString());

                    // מעבר אוטומטי לעמוד הדוח היומי
                    window.location.href = "daily-report.html";
                });

                date++; // מעבר ליום הבא
            }
            tr.appendChild(td); // הוספת התא לשורה
        }
        calendarTable.appendChild(tr); // הוספת השורה לטבלה
    }
}

// הפעלת יצירת הלוח ברגע שהעמוד נטען
window.addEventListener("DOMContentLoaded", createCalendar);

// -----------------------------
// 3. דוח יומי
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    const dailyReportTitle = document.getElementById("daily-report-date"); // אלמנט הכותרת של דוח יומי
    if (!dailyReportTitle) return; // אם הדף לא מכיל אותו, יוצאים

    // קריאה מה-localStorage של התאריך שנבחר
    const selectedDateStr = localStorage.getItem("selectedDate"); // התאריך ששמרנו בלוח החודשי
    let dateObj;

    if (selectedDateStr) {
        dateObj = new Date(selectedDateStr); // המרה מ-ISO לאובייקט Date
    } else {
        dateObj = new Date(); // אם לא נבחר תאריך, משתמשים בתאריך של היום
    }

    // שמות הימים והחודשים
    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];

    // חילוץ הנתונים מהתאריך
    const dayName = daysOfWeek[dateObj.getDay()]; // שם היום
    const monthName = months[dateObj.getMonth()]; // שם החודש
    const day = dateObj.getDate();                // מספר היום
    const year = dateObj.getFullYear();           // השנה

    // יצירת מחרוזת תצוגה יפה
    const formattedDate = `${dayName}, ${day} ${monthName} ${year}`;
    dailyReportTitle.textContent = formattedDate; // הצגת התאריך בכותרת הדוח

    // --- רשימת כניסות לדוגמה ---
    const entryTimes = ["08:42", "12:20", "19:10"]; // נתונים לדוגמה
    const listElement = document.getElementById("daily-list"); // רשימת ה-UL שבה נציג את הזמנים

    entryTimes.forEach((time, index) => {
        const li = document.createElement("li"); // יוצר פריט חדש
        li.textContent = `Entry #${index + 1}: ${time}`; // כותב את מספר הכניסה והשעה
        li.style.padding = "8px"; // רווח פנימי
        li.style.borderBottom = "1px solid #ddd"; // קו מפריד
        listElement.appendChild(li); // מוסיף לרשימה
    });

    // פריט סיכום כולל
    const totalLi = document.createElement("li");
    totalLi.textContent = `Total Entries: ${entryTimes.length}`; // סך הכל כניסות
    totalLi.style.fontWeight = "bold";
    totalLi.style.color = "#4B0082";
    totalLi.style.marginTop = "10px";
    listElement.appendChild(totalLi);
});






// --- חלק 1: ייבוא ספריות Firebase (חייב להיות בראש הקובץ) ---
// מייבא את הפונקציה להפעלת ה-Firebase באפליקציה
// שימי לב לכתובת המלאה הכוללת את שם הספרייה והגרסה (למשל 10.7.1)


