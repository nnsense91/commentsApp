export default {
	namespaced: true,
	state: {
		comments: {
			children:
			[
				{
					id: 1,
					AddReply: false,
					author: "Имя автора1",
					email: "",
					creationTime: "16:00",
					rating: 10,
					text: "magnis, aliquet tempus potenti viverra justo primis cum tristique nam vivamus neque. Nullam habitasse malesuada gravida porta non litora habitant vel taciti, blandit elementum tellus molestie hac porttitor nisl sociosqu interdum, placerat urna dis conubia bibendum cras diam quis. Pharetra habitant in lobortis arcu turpis hac, est eleifend lectus aenean nascetur ornare, quisque duis dis enim hendrerit. Porta per vivamus semper risus interdum molestie malesuada dis erat, in venenatis consectetur lacinia vel ultrices quisque elit at et, consequat metus rutrum duis purus nisl",
					children: []
				},
				{
					id: 2,
					AddReply: false,
					author: "Имя автора1-1",
					email: "",
					creationTime: "17:00",
					rating: 6,
					text: "Torquent ridiculus placerat arcu cum nulla mollis at ullamcorper, blandit mus tempor facilisis curae ac augue proin pretium, taciti scelerisque pellentesque lorem sollicitudin elit penatibus. Eleifend est lobortis pellentesque sodales amet enim arcu dignissim vivamus, ultrices fringilla rhoncus nascetur eu sit fames quisque, turpis senectus montes ridiculus purus egestas facilisis ligula molestie, viverra auctor scelerisque placerat proin tellus fermentum. Tellus senectus faucibus platea ridiculus maecenas pulvinar quisque ante scelerisque, leo diam lectus rutrum curabitur accumsan magna potenti molestie, cras dictum adipiscing posuere risus dignissim sociis iaculis."					,
					children: [
						{
							id: 3,
							AddReply: false,
							author: "Имя автора2-2",
							email: "",
							creationTime: "17:01",
							rating: -1,
							text: "Torquent ridiculus placerat arcu cum nulla mollis at ullamcorper, blandit mus tempor facilisis curae ac augue proin pretium, taciti scelerisque pellentesque lorem sollicitudin elit penatibus. Eleifend est lobortis pellentesque sodales amet enim arcu dignissim vivamus, ultrices fringilla rhoncus nascetur eu sit fames quisque, turpis senectus montes ridiculus purus egestas facilisis ligula molestie, viverra auctor scelerisque placerat proin tellus fermentum. Tellus senectus faucibus platea ridiculus maecenas pulvinar quisque ante scelerisque, leo diam lectus rutrum curabitur accumsan magna potenti molestie, cras dictum adipiscing posuere risus dignissim sociis iaculis.",
							children: []
						},
						{
							id: 4,
							AddReply: false,
							author: "Имя автора2",
							email: "",
							creationTime: "17:01",
							rating: -1,
							text: "Torquent ridiculus placerat arcu cum nulla mollis at ullamcorper, blandit mus tempor facilisis curae ac augue proin pretium, taciti scelerisque pellentesque lorem sollicitudin elit penatibus. Eleifend est lobortis pellentesque sodales amet enim arcu dignissim vivamus, ultrices fringilla rhoncus nascetur eu sit fames quisque, turpis senectus montes ridiculus purus egestas facilisis ligula molestie, viverra auctor scelerisque placerat proin tellus fermentum. Tellus senectus faucibus platea ridiculus maecenas pulvinar quisque ante scelerisque, leo diam lectus rutrum curabitur accumsan magna potenti molestie, cras dictum adipiscing posuere risus dignissim sociis iaculis.",
							children: [
								{
									id: 5,
									AddReply: false,
									author: "Имя автора3",
									email: "",
									creationTime: "17:05",
									rating: 16,
									text: "Torquent ridiculus placerat arcu cum nulla mollis at ullamcorper, blandit mus tempor facilisis curae ac augue proin pretium, taciti scelerisque pellentesque lorem sollicitudin elit penatibus. Eleifend est lobortis pellentesque sodales amet enim arcu dignissim vivamus, ultrices fringilla rhoncus nascetur eu sit fames quisque, turpis senectus montes ridiculus purus egestas facilisis ligula molestie, viverra auctor scelerisque placerat proin tellus fermentum. Tellus senectus faucibus platea ridiculus maecenas pulvinar quisque ante scelerisque, leo diam lectus rutrum curabitur accumsan magna potenti molestie, cras dictum adipiscing posuere risus dignissim sociis iaculis.",
									children: []
								}
							],
						}
					]
				},
				{
					id: 6,
					AddReply: false,
					author: "Имя автора1-2",
					email: "",
					creationTime: "16:05",
					rating: 1,
					text: "magnis, aliquet tempus potenti viverra justo primis cum tristique nam vivamus neque. Nullam habitasse malesuada gravida porta non litora habitant vel taciti, blandit elementum tellus molestie hac porttitor nisl sociosqu interdum, placerat urna dis conubia bibendum cras diam quis. Pharetra habitant in lobortis arcu turpis hac, est eleifend lectus aenean nascetur ornare, quisque duis dis enim hendrerit. Porta per vivamus semper risus interdum molestie malesuada dis erat, in venenatis consectetur lacinia vel ultrices quisque elit at et, consequat metus rutrum duis purus nisl",
					children: []
				}
			]
		}
	},
	mutations: {
		ADD_FORM_OPEN(state, commentId) {
			const func = (arr) => {
				arr.forEach(element => {
					element.AddReply = false;
					if (element.id === commentId) {
						element.AddReply = true;
					} else if (element.children !== undefined) {
						func(element.children);
					}
				});
			}

			func(state.comments.children);
		},
		ADD_COMMENT(state, [comment, targetId]) {
			const func = (arr) => {
				
				arr.forEach(element => {
					if (element.id === targetId) {
						element.children.push(comment);
						element.AddReply = false;
					} else if (element.children !== undefined) {
						func(element.children);
					}
				});
			}
			func(state.comments.children);
		}
	},
	actions: {
		openForm(store, commentId) {
			store.commit("ADD_FORM_OPEN", commentId);
		},
		addComment(store, [comment, targetId]) {
			store.commit("ADD_COMMENT", [comment, targetId])
		}
	}
}