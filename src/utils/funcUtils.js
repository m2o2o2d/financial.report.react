
/* Sort strings */
export const sortString = (s1, s2) => {
	if(s1 === s2) {
		return 0;
	} else {
		return s1 < s2 ? -1 : 1;
	}
};
