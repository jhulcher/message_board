var ApiUtil = require("../util/api_util.js");
var ApiActions = require("../actions/api_actions.js");
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var React = require('react');
var cur = window.current_user_id;
var Nav = require("./nav.jsx");
var UserStore = require("../stores/users.js");

var History = require("react-router").History;

var UpdateProfile = React.createClass({

  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return (
      { user: [], location: "", about_me: "" }
    );
  },

  componentWillMount: function () {
    ApiUtil.fetchUser(cur);

    this.listener = UserStore.addListener(function () {
      this.setState({ user: UserStore.all() });
    }.bind(this));

  },

  // incomingPic: function (pic) {
  //   this.history.push("pic/" + pic.id);
  // },

  handleUpdateUser: function (e) {
    e.preventDefault();
    ApiUtil.patchUser(cur, this.state.location, this.state.about_me);
    // this.history.pushState(null, "/" );
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  upload: function (e) {
    e.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS,
      function(error, results) {
        if(!error){
          ApiUtil.addPhoto(
            ApiActions.receiveUser,
            results[0].public_id,
            cur
          );
        }
      }.bind(this)
    );
  },

  render: function () {
    return (
      <div key="editprofile">
        <Nav></Nav>
        {
          this.state.user.map (function (user) {
            return (
              <div key="editprofile">
                <div>
                  <div>
                    { user.username }
                  </div>
                  <div>
                  <img src={"http://res.cloudinary.com/picstagram/image/upload/s-" +
                    "-cdzgeeOu--/c_lfill,h_200,q_100,w_200/" +
                    user.public_id + ".jpg"}/>
                  </div>
                  <div>
                    { user.user_since }
                  </div>
                  <div>
                    { user.post_count }
                  </div>
                  <div>
                    { user.location }
                  </div>
                  <div>
                    { user.about_me }
                  </div>
                </div>
                <div className=""
                   onClick={this.upload}>
                   UPLOAD PHOTO
                </div>
                <form method="POST" onSubmit={this.handleUpdateUser}>
                  <input type="text"
                         maxLength="30"
                         className=""
                         placeholder="Update Location"
                         valueLink={this.linkState('location')}/>
                   <input type="text"
                          maxLength="200"
                          className=""
                          placeholder="Update About Me"
                          valueLink={this.linkState('about_me')}/>
                   <button type="submit" />
                </form>

              </div>
            )
          }.bind(this))
        }
      </div>
    )
  }

  });

  module.exports = UpdateProfile;
