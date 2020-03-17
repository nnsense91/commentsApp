export default {
	namespaced: true,
	state: {
		comments: {
			addReply: false,
			children:
			[
				{
					id: 1,
					addReply: false,
					author: "Имя автора1",
					email: "",
					creationTime: "16:00",
					rating: 10,
					text: "magnis, aliquet tempus potenti viverra justo primis cum tristique nam vivamus neque. Nullam habitasse malesuada gravida porta non litora habitant vel taciti, blandit elementum tellus molestie hac porttitor nisl sociosqu interdum, placerat urna dis conubia bibendum cras diam quis. Pharetra habitant in lobortis arcu turpis hac, est eleifend lectus aenean nascetur ornare, quisque duis dis enim hendrerit. Porta per vivamus semper risus interdum molestie malesuada dis erat, in venenatis consectetur lacinia vel ultrices quisque elit at et, consequat metus rutrum duis purus nisl",
					children: []
				},
			]
		}
	},
	mutations: {
		ADD_FORM_OPEN(state, commentId) {
			const func = (arr) => {
				arr.forEach(element => {
					element.addReply = false;
					if (element.id === commentId) {
						element.addReply = true;
						func(element.children);
					} else if (element.children !== undefined) {
						func(element.children);
					}
				});
			}

			if (commentId === undefined) {
				state.comments.addReply = true;
				func(state.comments.children);
			} else {
				state.comments.addReply = false;
				func(state.comments.children);
			}
			
		},
		ADD_COMMENT(state, [comment, targetId]) {
			const func = (arr) => {
				
				arr.forEach(element => {
					if (element.id === targetId) {
						element.children.push(comment);
						element.addReply = false;
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
			console.log(comment);
			store.commit("ADD_COMMENT", [comment, targetId])
		}
	}
}