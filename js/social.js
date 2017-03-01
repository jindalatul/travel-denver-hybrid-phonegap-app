function shareonfacebook()
{
	showLogin();
}

function showLogin()
  {
  	facebookConnectPlugin.login(["public_profile"],
    		showShareDialog(),
    		function (error) { showLogin(url); }
		);
  }

  function showShareDialog()
  {
  	var url ="http://denverstorm.com/wp-content/uploads/2014/12/DenverStorm.gif";
		facebookConnectPlugin.showDialog( 
			    {
			        method: "feed",
			        picture:url,
			        name:'Denver Travel App',
			        message:'First Travel picture',    
			        caption: 'Sightseeing in Denver',
			        description: 'Posting photo using phonegap facebook plugin'
			    }, 
			    function (response) { alert("Post Shared Successfully") },
			    function (response) { showLogin(); });
  }


