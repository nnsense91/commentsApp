export default {
	namespaced: true,
	state: {
		comments: {
			addReply: false,
			children: []
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
						element.children.push(comment);
						element.addReply = false;
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