export default {
	namespaced: true,
	state: {
		comments: {
			addReply: false,
			children: [
				{
					id: 1,
					depth: 1,
					addReply: false,
					author: "Test",
					email: "",
					creationTime: 1583673300883,
					rating: 0,
					text: "loremlorem",
					children: [
						{
							id: 2,
							depth: 2,
							addReply: false,
							author: "Test",
							email: "",
							creationTime: 1584673300883,
							rating: 0,
							text: "loremlorem",
							children: [
								{
									id: 3,
									depth: 3,
									addReply: false,
									author: "Test",
									email: "",
									creationTime: 1584683400883,
									rating: -11,
									text: "loremlorem",
									children: []
								}
							]
						}
					]
				}
			]
		}
	},
	mutations: {
		ADD_FORM_OPEN(state, commentId) {
			const setFormPosition = (arr) => {
				arr.forEach(element => {
					element.addReply = false;
					if (element.id === commentId) {
						element.addReply = true;
						setFormPosition(element.children);
					} else if (element.children !== undefined) {
						setFormPosition(element.children);
					}
				});
			}

			if (commentId === undefined) {
				state.comments.addReply = true;
				setFormPosition(state.comments.children);
			} else {
				state.comments.addReply = false;
				setFormPosition(state.comments.children);
			}
			
		},
		ADD_COMMENT(state, [comment, targetId]) {

			const setCommentPosition = (arr) => {
				arr.forEach(element => {
					if (element.id === targetId) {
						comment.depth = element.depth + 1;
						
						if (comment.depth <= 3) {
							element.children.push(comment);
							element.addReply = false;
						} else {
							arr.push(comment);
							element.addReply = false;
						}
					} else if (element.children !== undefined) {
						setCommentPosition(element.children);
					}
				});
			}

			if (targetId === undefined) {
				state.comments.children.push(comment);
				state.comments.addReply = false;
			} else {
				setCommentPosition(state.comments.children);
			}
		},
		SET_RATING(state, [commentId, actionType]) {
			const setIncrease = (arr) => {
				arr.forEach(element => {
					if (element.id === commentId) {
						if (actionType === "increase") {
							element.rating++;
						} else if (actionType === "reduce") {
							element.rating--;
						}
					} else {
						setIncrease(element.children);
					}
				});
			}

			setIncrease(state.comments.children)
		}
	},
	actions: {
		openForm(store, commentId) {
			store.commit("ADD_FORM_OPEN", commentId);
		},
		addComment(store, [comment, targetId]) {
			store.commit("ADD_COMMENT", [comment, targetId]);
		},
		changeRating(store, [commentId, actionType]) {
			store.commit("SET_RATING", [commentId, actionType]);
		}
	}
}