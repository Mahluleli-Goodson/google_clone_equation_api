class StringUtil {

    public removeWhiteSpace = (text: string) => {
        return text.replace(/\s/g, "");
    };

    public isEmpty = (text: string) => {
        return this.removeWhiteSpace(text) == "";
    }
}

const stringUtil = new StringUtil;

export default stringUtil;
