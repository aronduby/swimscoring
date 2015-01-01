<!DOCTYPE html>
<html lang="en">

<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>SwimScoring</title>

	<link href='http://fonts.googleapis.com/css?family=Roboto:400,400italic|Roboto+Condensed:400,300,700' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" href="css/combined.css">

</head>

<body id="page-top" class="index">

	<!-- Navigation -->
	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header page-scroll">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand page-scroll" href="#page-top">
					<img src="img/logo-horz.svg" alt="SwimScoring" />
				</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
					<li class="hidden"><a href="#page-top"></a></li>
					<li><a class="page-scroll" href="#features">Features</a></li>
					<li><a class="page-scroll" href="#screenshot">Screenshots</a></li>
					<li><a class="page-scroll" href="#contact">Contact</a></li>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>

	<!-- Header -->
	<header>
		<div class="container">
			<div class="intro-text">
				<h1 class="logo"><i>Swim</i>Scoring <img src="img/logo-horz-stack.svg" /></h1>
				<p class="tagline">No more guessing, no more waiting, and no more notepads and pencils&hellip; it's the 21<sup>st</sup> century dang it!</p>
				<div class="stores">
					<div class="android">
						<a class="btn btn-default btn-block" href="https://play.google.com/store/apps/details?id=com.aronduby.swimscore">
							<span>
								<i>Available on</i>	Google Play
							</span>
						</a>
					</div>
					<div class="ios">
						<a class="btn btn-default disabled btn-block">
							<span>
							<i>Coming Soon(ish)</i> App Store
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</header>

	<!-- Features Section -->
	<section id="features">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 text-center">
					<h2 class="section-heading">Features</h2>
					<h3 class="section-subheading text-muted">I made it do stuff I wanted, guessing you want it too</h3>
				</div>
			</div>
			<div class="row text-center">
				<div class="col-sm-4">
					<span class="fa-stack fa-4x">
						<i class="fa fa-circle fa-stack-2x text-primary"></i>
						<i class="fa fa-toggle-on fa-stack-1x fa-inverse"></i>
					</span>
					<h4 class="feature-heading">Taps or Buttons</h4>
					<p class="text-muted">Score by taping the lanes in the order they finished, or switch to buttons because the 50 free is too fast and they announce diving in the opposite order</p>
				</div>
				<div class="col-sm-4">
					<span class="fa-stack fa-4x">
						<i class="fa fa-circle fa-stack-2x text-primary"></i>
						<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
					</span>
					<h4 class="feature-heading">Ditch the Pencil</h4>
					<p class="text-muted">Having trouble remembering that state cut time? Want to remember your kids best time? Save it in a note! Each note is tied to an event, and notes carry over from meet to meet.</p>
				</div>
				<div class="col-sm-4">
					<span class="fa-stack fa-4x">
						<i class="fa fa-circle fa-stack-2x text-primary"></i>
						<i class="fa fa-share-alt fa-stack-1x fa-inverse"></i>
					</span>
					<h4 class="feature-heading">Be Social</h4>
					<p class="text-muted">Once your team wins, share it to your favorite sites. Because if your kid wins the meet and it's not plastered all over social media, did they really win?</p>
				</div>
			</div>
			<div class="container submit-features">
				<p>Got a great idea for a new feature? <a href="#contact">Hit us up!</a></p>
			</div>
		</div>
	</section>

	<!-- Screen Shots Grid Section -->
	<section id="screenshot" class="bg-light-gray">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 text-center">
					<h2 class="section-heading">Screen<i>shots</i></h2>
					<h3 class="section-subheading text-muted">"I feel pretty, oh so pretty. I feel pretty and witty and bright!"</h3>
				</div>
			</div>
			<div class="row">

				<?php
				$pics = [
					'home' => "The Home Page",
					'notes' => "Globally Edit Notes",
					'event-taps' => "Event, scored with taps",
					'event-buttons' => "This time with buttons",
					'meet-final-share' => "Sharing is Caring",
					'tablet-event' => "Plays well with Tablets"
				];

				foreach($pics as $href => $title){
					?>
					<div class="col-md-4 col-sm-6 screenshot-item">
						<a href="img/screenshots/<?= $href ?>.png" class="screenshot-link">
							<div class="screenshot-hover">
								<div class="screenshot-hover-content">
									<i class="fa fa-plus fa-3x"></i>
								</div>
							</div>
							<div class="fake-img" style="background-image:url(img/screenshots/<?= $href ?>.png)"></div>
						</a>
						<div class="screenshot-caption">
							<h4><?= $title ?></h4>
						</div>
					</div>
					<?php
				}
				?>

			</div>
		</div>
	</section>

	<section id="contact">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 text-center">
					<h2 class="section-heading">Contact<i>Us</i></h2>
					<h3 class="section-subheading text-muted">&hellip;and by &quot;us&quot; I mean me, but like the royal me, so us.</h3>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<form name="sentMessage" id="contactForm" novalidate>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<input type="text" class="form-control" placeholder="Your Name *" id="name" required data-validation-required-message="Please enter your name.">
									<p class="help-block text-danger"></p>
								</div>
								<div class="form-group">
									<input type="email" class="form-control" placeholder="Your Email *" id="email" required data-validation-required-message="Please enter your email address.">
									<p class="help-block text-danger"></p>
								</div>
								<div class="form-group">
									<input type="tel" class="form-control" placeholder="Your Phone *" id="phone" required data-validation-required-message="Please enter your phone number.">
									<p class="help-block text-danger"></p>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<textarea class="form-control" placeholder="Your Message *" id="message" required data-validation-required-message="Please enter a message."></textarea>
									<p class="help-block text-danger"></p>
								</div>
							</div>
							<div class="clearfix"></div>
							<div class="col-lg-12 text-center">
								<div id="success"></div>
								<button type="submit" class="btn btn-xl">Send Message</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>

	<footer>
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<span class="copyright">Copyright &copy; Duby Digital Media, 2015</span>
				</div>
				<div class="col-md-4"></div>
				<div class="col-md-4">
					Made with &hearts; in Hudsonville, MI. Go Eagles!
				</div>
			</div>
		</div>
	</footer>

	<script src="js/combined.js"></script>

</body>

</html>
