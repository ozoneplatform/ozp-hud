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
      content: "The global menu provides a list of resources you can use to submit listings, manage your listings, view your profile, contact us, etc.",
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
      element: ".LibraryTile:first",
      title: "Bookmarks",
      content: "When you bookmark a listing in Center, it appears here in your HUD. Bookmarks provide easy access to listings. Use them to group and access your tools. Click a tile to quickly launch the bookmark.",
      placement: "bottom",
      orphan: true,
      backdropContainer: ".LibraryTile",
      backdropPadding: 0
    },
    {
      element: ".LibraryTile:first",
      title: "Remove a Bookmark",
      content: "Use the menu on each bookmark tile to remove or get help for that specific listing. Removing the bookmark does not delete the listing from the system - it only disappears from your HUD. To bookmark it again, find it in Center.",
      placement: "right",
      orphan: true,
      backdropContainer: ".LibraryTile",
      backdropPadding: 0,
      onShown: function() {
        $(".LibraryTile__actionMenu > input").prop("checked", true);
      },
      onHide: function() {
        $(".LibraryTile__actionMenu > input").prop("checked", false);
      }
    },
    {
      element: ".FolderTile:first",
      title: "Drag and Drop into Folders",
      content: "Click a bookmark tile and drag it over another bookmark tile to create a folder. To add bookmark to an existing folder, drag and drop it over the folder tile.",
      placement: "top",
      orphan: true,
      backdropContainer: ".FolderTile",
      backdropPadding: 0
    },
    {
      path: "/dist/#/folder/[[LINKTOFOLDER]]",
      element: ".modal-body",
      title: "Folder",
      content: "Click a folder tile to access the contents. From this view you can access individual bookmarks and get a link to share the folder with others. To move bookmarks out of a folder, drag and drop the bookmark tile outside the window. The bookmark will return to the first level.",
      orphan: true,
      backdropContainer: ".modal-content",
      backdropPadding: 0
    }
  ]
});
