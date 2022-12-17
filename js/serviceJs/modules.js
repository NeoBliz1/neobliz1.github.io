//handler for links in skills area
this.mySkillsLinksHalndler = () => {
	//get all links in divs with class=linksContainer
	$(".linksContainer > a").each(function (index, el) {
		//if data attrimute isn't undefined then add onClick listner
		const dataLinkToEl = $(this).attr("data-linkToElement");
		if (typeof dataLinkToEl === "string") {
			//get project preview div
			const $projectPreviewDiv = $("." + dataLinkToEl);
			//callculate project preview offset
			const marginPercentFromTop = 5;
			const offsetFromTop = $projectPreviewDiv.offset().top;
			const newOffsetFromTop =
				offsetFromTop - (offsetFromTop * marginPercentFromTop) / 100;
			//console.log(newOffsetFromTop);
			//add listner to link by data attribute
			$(this).click(function (event) {
				event.preventDefault();
				//disable mouse event handler from skills divs
				$(".projectDiv").off("mouseenter mouseleave vmouseover vmouseout");
				//scroll to project preview
				$("html").animate(
					{
						scrollTop: newOffsetFromTop
					},
					{
						duration: 900,
						complete: function () {
							//enable mouse event handler from skills divs
							mySkillsAnimation();
							$projectPreviewDiv.trigger("mouseenter");
							if (!platformIsMobile) {
								console.log("platform is mobile 123");
								$(".projectDiv").off(
									"mouseenter mouseleave vmouseover vmouseout"
								);
								$projectPreviewDiv
									.find("#rmb")
									.one(
										"webkitAnimationEnd oanimationend msAnimationEnd animationend",
										function (e) {
											// console.log('i animation end');
											$(this).trigger("click");
										}
									)
									.addClass("hovered");
							}
						}
					}
				);
				//trigger click on #rmb button in project preview div
			});
		}
	});
	// console.log(
	// 	$('.linksContainer > ').attr('data-linktoelement')
	// );
};
