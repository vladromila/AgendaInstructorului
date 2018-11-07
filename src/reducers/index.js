
import { combineReducers} from 'redux';
import LoginReducer from './LoginReducer';
import SignUpReducer from './SignUpReducer';
import FetchReducer from './FetchReducer';
import ClassInfoReducers from './ClassInfoReducers';
import StudentsReducer from './StudentsReducer';
import StudentsFetchReducer from './StudentsFetchReducer';
import CanceledClassesFetchReducer from './CanceledClassesFetchReducer';
import ExamsFetchReducer from './ExamsFetchReducer';
import ExamsReducer from './ExamsReducer';
import InfoFetchReducer from './InfoFetchReducer';
import AStudentsFetchReducers from './AStudentsFetchReducers';
import RStudentsFetchReducers from './RStudentsFetchReducers';
import InactiveStudentsFetch from './InactiveStudentsFetch';

export default combineReducers({
    login:LoginReducer,
    register:SignUpReducer,
    classes:FetchReducer,
    studentsFetch:StudentsFetchReducer,
    classInfo:ClassInfoReducers,
    students:StudentsReducer,
    canceledClasses:CanceledClassesFetchReducer,
    exams_fetched:ExamsFetchReducer,
    exams:ExamsReducer,
    info:InfoFetchReducer,
    inactiveStudents:InactiveStudentsFetch,
    AStudents:AStudentsFetchReducers,
    RStudents:RStudentsFetchReducers
})