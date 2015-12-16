module.exports = new Tour({
  backdrop: true,
  backdropPadding: 10,
  template: '<div class="popover" role="tooltip"> <div class="arrow"></div> <h3 class="popover-title"></h3> <div class="popover-content"></div> <div class="popover-navigation"> <button class="btn btn-sm" data-role="end">End tour</button> <div class="btn-group"> <button class="btn btn-sm btn-default" data-role="prev">&laquo; Prev</button> <button class="btn btn-sm btn-default" data-role="next">Next &raquo;</button> <button class="btn btn-sm btn-default" data-role="pause-resume" data-pause-text="Pause" data-resume-text="Resume">Pause</button> </div> </div> </div>',
  steps: [
    {
      element: "#tourstop-hud",
      title: "HUD",
      content: "Opens HUD (heads up display) where your bookmarks are stored. Think of HUD like the home screen on a smart phone.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-center",
      title: "Center",
      content: "Opens Center where you can search for listings to bookmark to your HUD or open in Webtop.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-webtop",
      title: "Webtop",
      content: "Opens Webtop, your customizable workspace within the platform.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-notifications",
      title: "Notifications",
      content: "Receive notifications from your Center steward here. If you have an unread notification, the icon will change to blue to alert you. Once you've read a notification, you can click the X to dismiss it. Otherwise, it will disappear from the list when it expires.",
      placement: "bottom",
      backdropContainer: ".navbar-fixed-top"
    },
    {
      element: "#tourstop-help",
      title: "Help",
      content: "Access help videos and articles explaining how to use the platform.",
      placement: "left",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0
    },
    {
      element: "#tourstop-global-menu",
      title: "Global Menu",
      content: "The main menu provides a list of resources you can use to submit listings, manage your listings, view your profile, contact us, etc.",
      placement: "left",
      backdropContainer: ".navbar-fixed-top",
      backdropPadding: 0,
      onShown: function() {
        $("#tourstop-global-menu").addClass("open");
      },
      onHide: function() {
        $("#tourstop-global-menu").removeClass("open");
      }
    },
    {
      element: "#tourstop-center-search",
      title: "Search and Filter",
      content: "Use keywords and filters to explore listings. When you enter a search term, the system looks for your term in the listing's name, description, tags, etc.",
      placement: "bottom",
      backdropContainer: "#header"
    },
    {
      element: "#tourstop-center-categories",
      title: "Filter by Category",
      content: "Use categories to reduce your search results. When you click a category, only listings in that category will appear on the page. If you select multiple categories, only listings associated with all of the selected categories will appear.",
      placement: "right"
    },
    {
      element: "#tourstop-center-home",
      title: "Center Home",
      content: "After searching and filtering, click here to return to the Center Discovery page to see featured listings, new arrivals and most popular listings.",
      placement: "right"
    }
  ]
});
