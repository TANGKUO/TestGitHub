// ** I18N

// Calendar CA 
// Modified by canigo

Calendar._DN = new Array
("Domingo",
 "Dilluns",
 "Dimarts",
 "Dimecres",
 "Dijous",
 "Divendres",
 "Dissabte",
 "Diumenge");

// Please note that the following array of short day names (and the same goes
// for short month names, _SMN) isn't absolutely necessary.  We give it here
// for exemplification on how one can customize the short day names, but if
// they are simply the first N letters of the full name you can simply say:
//
//   Calendar._SDN_len = N; // short day name length
//   Calendar._SMN_len = N; // short month name length
//
// If N = 3 then this is not needed either since we assume a value of 3 if not
// present, to be compatible with translation files that were written before
// this feature.

// short day names
Calendar._SDN = new Array
("Dg",
 "Dl",
 "Dm",
 "Dx",
 "Dj",
 "Dv",
 "Di",
 "Dg");

// First day of the week. "0" means display Sunday first, "1" means display
// Monday first, etc.
Calendar._FD = 1;

// full month names
Calendar._MN = new Array
("Gener",
 "Febrer",
 "Mar?",
 "Abril",
 "Maig",
 "Juny",
 "Juliol",
 "Agost",
 "Setembre",
 "Octubre",
 "Novembre",
 "Desembre");

// short month names
Calendar._SMN = new Array
("Gen",
 "Feb",
 "Mar",
 "Abr",
 "Mai",
 "Jun",
 "Jul",
 "Ago",
 "Set",
 "Oct",
 "Nov",
 "Des");

// tooltips
Calendar._TT = {};
Calendar._TT["INFO"] = "Calendari";

Calendar._TT["ABOUT"] = "Calendari";

Calendar._TT["PREV_YEAR"] = "Any anterior";
Calendar._TT["PREV_MONTH"] = "Mes anterior";
Calendar._TT["GO_TODAY"] = "Anar a avui";
Calendar._TT["NEXT_MONTH"] = "Mes seg?ent";
Calendar._TT["NEXT_YEAR"] = "Any seg?ent";
Calendar._TT["SEL_DATE"] = "Seleccionar data";
Calendar._TT["DRAG_TO_MOVE"] = "Arrossegar per moure";
Calendar._TT["PART_TODAY"] = " (avui)";

// the following is to inform that "%s" is to be the first day of week
// %s will be replaced with the day name.
Calendar._TT["DAY_FIRST"] = "Fer %s el primer dia de la setmana";

// This may be locale-dependent.  It specifies the week-end days, as an array
// of comma-separated numbers.  The numbers are from 0 to 6: 0 means Sunday, 1
// means Monday, etc.
Calendar._TT["WEEKEND"] = "6,0";

Calendar._TT["CLOSE"] = "Tancar";
Calendar._TT["TODAY"] = "Avui";
Calendar._TT["TIME_PART"] = "(Maj?scula-)Click o arrossegar per canviar el valor";

// date formats
Calendar._TT["DEF_DATE_FORMAT"] = "%d/%m/%Y";
Calendar._TT["TT_DATE_FORMAT"] = "%A, %e de %B de %Y";

Calendar._TT["WK"] = "setm";
Calendar._TT["TIME"] = "Hora:";
