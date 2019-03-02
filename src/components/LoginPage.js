import React, { Component } from 'react'
import FacebookAuth from 'react-facebook-auth'

const FacebookButton = ({ onClick }) => (
  <a href="#" className="btn-face m-b-20" onClick={onClick}>
    <i className="fa fa-facebook-official"></i>
    Facebook
  </a>
)

export default class LoginPage extends Component {

  authenticateFacebook = response => {
    console.log(response)
  }

  render() {
    return (
      <div className="limiter">
        {/* <div className="container-login100" style={{backgroundImage: "url('/static/auth/images/bg-01.jpg')"}}> */}
        <div className="container-login100" style={{backgroundImage: "url('http://fc06.deviantart.com/fs19/i/2007/303/8/2/Oblivion___Wallpaper_by_AKAcorn.jpg')"}}>
          <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
            <form className="login100-form validate-form flex-sb flex-w">
              <span className="login100-form-title p-b-53">
                Sign In to PaprInk
              </span>
              <FacebookAuth
                appId={process.env.FB_LOGIN_APP_ID}
                autoLoad
                fields={"name,first_name,middle_name,last_name,short_name,picture,email,birthday,location,gender,link"}
                callback={this.authenticateFacebook}
                component={FacebookButton}
              />
              <a href="#" className="btn-google m-b-20">
                <img src="/static/auth/images/icons/icon-google.png" alt="GOOGLE" />
                Google
              </a>
            </form>
          </div>
        </div>
      </div>
    )
  }

}
