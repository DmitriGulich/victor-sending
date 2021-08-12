import { Route, Redirect, Switch } from "react-router-dom";
import Register from "./Components/auth/register";
import Login from "./Components/auth/login";
import VerifyEmail from "./Components/auth/verifyEmail";
import Mailboard from "./views/mailboard";
import ProtectedRoute from "./Components/shared/protectedRoute";
import Header from "./views/header";
import Footer from "./views/footer";
import SmtpConfig from "./Components/smtp/smtpConfig";
import Verified from "./Components/auth/verified";
import Payments from "./views/payments";

function App() {

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/register/verify" exact component={VerifyEmail} />
        <Route path="/verify/:confirmationCode" exact component={Verified} />
        <Route path="/payments" exact component={Payments} />
        <ProtectedRoute path="/smtp" exact component={SmtpConfig} />
        <ProtectedRoute path='/send' exact component={Mailboard} />
        <Redirect to="/send" from="/" />
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}
 

export default App;