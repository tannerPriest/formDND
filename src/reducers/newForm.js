const newFormReducer = (
    state = {
        form: {
            formName: "",
            description: "",
            formData: []
        },
        newField: {
            type: "",
            name: "",
            label: "",
            options: []
        },
        option: {
            value: ""
        },
        fields: {

        },
        column: {
            id: 'fieldColumn',
            fieldIds: [],
        }
    },
    action
) => {
    const { newField, column, option, fields } = state;
    const { type, payload } = action;
    switch (type) {
        case "NEW_FIELD":
            const fieldID = payload.name;
            const field = { ...payload, "id": fieldID }
            const { id, fieldIds } = column;
            return {
                ...state,
                newField: {
                    type: "",
                    name: "",
                    label: "",
                    options: []
                },
                option: {
                    value: ""
                },
                fields: {
                    ...fields,
                    [fieldID]: field
                },
                column: {
                    "id": id,
                    fieldIds: [...fieldIds, fieldID]
                }
            };
        case "NEWFIELD_CHANGE":
            return {
                ...state,
                newField: payload
            };
        case "FORM_CHANGE":
            return {
                ...state,
                form: payload,
                newField,
                option
            };
        case "SAVE_FORM":
            return state;
        case "DRAG_END":
            const { destination, source, draggableId } = payload;
            const newFieldsIds = Array.from(column.fieldIds)
            if (!destination) {
                return state;
            }
            if (destination.droppableId === source.droppableId &&
                destination.index === source.index
            ) {
                return state;
            }
            newFieldsIds.splice(source.index, 1);
            newFieldsIds.splice(destination.index, 0, draggableId)
            return {
                ...state,
                column: {
                    id: 'fieldColumn',
                    fieldIds: newFieldsIds,
                }
            };
        default:
            return state;
    };
};

export default newFormReducer;