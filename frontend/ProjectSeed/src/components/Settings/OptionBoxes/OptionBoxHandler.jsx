import OptionPhoto from "./OptionPhoto";
import OptionStandard from "./OptionStandard";

function OptionBoxHandler({ option }) {

    if (option.type === "option") {
        const commonProps = {
            optionTitle: option.optionTitle,
            description: option.description,
            currentValue: option.currentValue,
            optionNumber: option.optionNumber,
            OptionForm: option.OptionForm
        };

        if (option.optionType === "standard") {
            return <OptionStandard {...commonProps} />;
        }

        if (option.optionType === "photo") {
            return <OptionPhoto {...commonProps} />;
        }
    }

    return <h1 className="w-[78%] text-2xl mt-10">{option.title}</h1>;
}

export default OptionBoxHandler;
