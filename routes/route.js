module.exports = function(app) {
	app.get('/', function(req, res) {
		var projectdata = '';
		var leftnav = require('./data/left-nav.json');
		res.render('about.html', {
			title: "Andrew Hess: About",
			data: projectdata,
			leftnav: leftnav,
		});
	});

	app.get('/resume', function(req, res) {
		var projectdata = '';
		var leftnav = require('./data/left-nav.json');
		res.render('resume.html', {
			title: "Andrew Hess: Resume",
			data: projectdata,
			leftnav: leftnav,
		});
	});


	app.get('/projects', function(req, res) {
		var leftnav = require('./data/left-nav.json');
		var projects = require('./data/projects.json');
		var projectdata = '';
		res.render('projects.html', {
			title: "Andrew Hess: Projects",
			data: projectdata,
			leftnav: leftnav,
			projects: projects,
		});
	});

	app.get('/projects/:project', function(req, res) {
		var leftnav = require('./data/left-nav.json');
		var projectdata;
		var title;
		switch (req.params.project) {
			case 'investment-insights':
				title = "Investment Insights with Watson";
				projectdata = require('./data/investment-insights.json');
				break;
			case 'bluemix-finance':
				title = "IBM Cloud for Financial Services";
				projectdata = require('./data/bluemix-finance.json');
				break;
			case 'dataworks-lift':
				title = "DataWorks Lift";
				projectdata = require('./data/dataworks-lift.json');
				break;
			case 'watson-analytics':
				title = "Watson Analytics";
				projectdata = require('./data/watson-analytics.json');
				break;
			default:
				return res.redirect('/');
				break;
		}
		res.render('projectdetails.html', {
			title: title,
			data: projectdata,
			leftnav: leftnav
		});
	});
	
}