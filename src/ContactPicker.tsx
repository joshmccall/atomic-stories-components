import * as React from 'react';
import { IPersonaProps, IBasePickerSuggestionsProps, IBasePicker, CompactPeoplePicker, ValidationState, IPickerItemProps, PeoplePickerItem, IconButton } from 'office-ui-fabric-react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
initializeIcons();

export interface IPeoplePickerExampleState {
    delayResults?: boolean;
    peopleList: IPersonaProps[];
    mostRecentlyUsed: IPersonaProps[];
    currentSelectedItems: IPersonaProps[];
}
export interface IPeoplePickerExampleProps {
    peopleList: IPersonaProps[];
    mostRecentlyUsed: IPersonaProps[];
    currentSelectedItems: IPersonaProps[];
}

const suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested People',
    mostRecentlyUsedHeaderText: 'Suggested Contacts',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading',
    showRemoveButtons: true,
    suggestionsAvailableAlertText: 'People Picker Suggestions available',
    suggestionsContainerAriaLabel: 'Suggested contacts',
};



export default class extends React.Component<IPeoplePickerExampleProps, IPeoplePickerExampleState> {
    // All pickers extend from BasePicker specifying the item type.
    private _picker = React.createRef<IBasePicker<IPersonaProps>>();

    constructor(props: IPeoplePickerExampleProps) {
        super(props);
        this.state = {
            delayResults: !!this.props.peopleList,
            peopleList: this.props.peopleList,
            mostRecentlyUsed: this.props.mostRecentlyUsed,
            currentSelectedItems: this.props.currentSelectedItems,
        };
    }

    public render() {
        console.log({
            peopleList: this.state.peopleList,
            currentSelectedItems: this.state.currentSelectedItems
        })
        return (
            <>
                <div
                    style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: 20, width: 260 }}
                >
                    <CompactPeoplePicker
                        selectedItems={this.state.currentSelectedItems}
                        onItemSelected={(selectedItem?: IPersonaProps | undefined) => {
                            selectedItem && this.setState({ currentSelectedItems: [selectedItem] })
                            return selectedItem ? selectedItem : null
                        }}
                        onRenderItem={(props: IPickerItemProps<IPersonaProps>) => {
                            return <PeoplePickerItem
                                item={{
                                    ...props.item,
                                    ValidationState: ValidationState.valid
                                }}
                                index={props.index}
                                onRemoveItem={() => {
                                    this.setState({ currentSelectedItems: [] })
                                    console.log('onRemoveItem')

                                }}
                            />
                        }}

                        itemLimit={1}
                        onResolveSuggestions={this._onFilterChanged}
                        onEmptyInputFocus={this._returnMostRecentlyUsed}
                        getTextFromItem={this._getTextFromItem}
                        className={'ms-PeoplePicker'}
                        defaultSelectedItems={this.state.currentSelectedItems}
                        key={'list'}
                        pickerSuggestionsProps={suggestionProps}
                        onRemoveSuggestion={this._onRemoveSuggestion}
                        onValidateInput={this._validateInput}
                        inputProps={{
                            onBlur: () => console.log('onBlur called'),
                            onFocus: () => {
                                console.log('onFocus called', this.state.currentSelectedItems)
                                if (this.state.currentSelectedItems) {
                                    this.setState({ currentSelectedItems: [] })
                                }
                            },
                            'aria-label': 'People Picker'
                        }}
                        componentRef={this._picker}
                        resolveDelay={300}
                        styles={{
                            root: {
                                display: 'inline-block',
                                width: '85%',
                            }
                        }}
                    />
                    <IconButton
                        primary
                        styles={{
                            root: {
                                width: '15%',
                                backgroundColor: 'rgb(0, 120, 212)',
                                color: 'white',
                                padding: 0,
                            }
                        }}
                        iconProps={{ iconName: 'zoom' }}
                        title="search"
                        ariaLabel="search"
                    />
                </div>
            </>
        );
    }

    private _getTextFromItem(persona: IPersonaProps): string {
        return persona.text as string;
    }







    private _onRemoveSuggestion = (item: IPersonaProps): void => {
        const { peopleList, mostRecentlyUsed: mruState } = this.state;
        if (peopleList && mruState) {

            const indexPeopleList: number = peopleList.indexOf(item);
            const indexMostRecentlyUsed: number = mruState.indexOf(item);

            if (indexPeopleList >= 0) {
                const newPeople: IPersonaProps[] = peopleList.slice(0, indexPeopleList).concat(peopleList.slice(indexPeopleList + 1));
                this.setState({ peopleList: newPeople });
            }

            if (indexMostRecentlyUsed >= 0) {
                const newSuggestedPeople: IPersonaProps[] = mruState
                    .slice(0, indexMostRecentlyUsed)
                    .concat(mruState.slice(indexMostRecentlyUsed + 1));
                this.setState({ mostRecentlyUsed: newSuggestedPeople });
            }
        }
    };

    // (filter: string, selectedItems?: IPersonaProps[] | undefined)
    // IPersonaProps[] | PromiseLike<IPersonaProps[]>
    private _onFilterChanged = (
        filterText: string,
        currentPersonas?: IPersonaProps[],
    ): IPersonaProps[] | Promise<IPersonaProps[]> => {
        if (filterText) {
            let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);
            if (currentPersonas) {
                filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
            }
            // filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
            return this._filterPromise(filteredPersonas);
        } else {
            return [];
        }
    };

    private _returnMostRecentlyUsed = (currentPersonas?: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
        let { mostRecentlyUsed } = this.state;
        if (currentPersonas && mostRecentlyUsed) {
            mostRecentlyUsed = this._removeDuplicates(mostRecentlyUsed, currentPersonas);
            return this._filterPromise(mostRecentlyUsed);
        }
        return [];
    };



    private _filterPromise(personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
        if (this.state.delayResults) {
            return this._convertResultsToPromise(personasToReturn);
        } else {
            return personasToReturn;
        }
    }

    private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
        if (!personas || !personas.length || personas.length === 0) {
            return false;
        }
        return personas.filter(item => item.text === persona.text).length > 0;
    }

    private _filterPersonasByText(filterText: string): IPersonaProps[] {
        const { peopleList } = this.state;
        return peopleList && peopleList.filter(item => this._doesTextStartWith(item.text as string, filterText)) || []
    }

    private _doesTextStartWith(text: string, filterText: string): boolean {
        return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
    }

    private _convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
        return new Promise<IPersonaProps[]>((resolve) => setTimeout(() => resolve(results), 2000));
    }

    private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
        return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
    }

    // private _toggleDelayResultsChange = (ev: React.MouseEvent<HTMLElement>, toggleState: boolean): void => {
    //     this.setState({ delayResults: toggleState });
    // };

    // private _dropDownSelected = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    //     this.setState({ currentPicker: option.key });
    // };

    private _validateInput = (input: string): ValidationState => {
        if (input.indexOf('@') !== -1) {
            return ValidationState.valid;
        } else if (input.length > 1) {
            return ValidationState.warning;
        } else {
            return ValidationState.invalid;
        }
    };


}