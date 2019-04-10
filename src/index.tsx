/**
 * @class ExampleComponent
 */

import * as React from 'react'

import FindYourContact from './FindYourContact';

export type Props = { text: string }


const baseProductionCdnUrl = 'http://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/';

export const TestImages = {
  choiceGroupBarUnselected: baseProductionCdnUrl + 'choicegroup-bar-unselected.png',
  choiceGroupBarSelected: baseProductionCdnUrl + 'choicegroup-bar-selected.png',
  choiceGroupPieUnselected: baseProductionCdnUrl + 'choicegroup-pie-unselected.png',
  choiceGroupPieSelected: baseProductionCdnUrl + 'choicegroup-pie-selected.png',
  documentPreview: baseProductionCdnUrl + 'document-preview.png',
  documentPreviewTwo: baseProductionCdnUrl + 'document-preview2.png',
  documentPreviewThree: baseProductionCdnUrl + 'document-preview3.png',
  iconOne: baseProductionCdnUrl + 'icon-one.png',
  iconPpt: baseProductionCdnUrl + 'icon-ppt.png',
  personaFemale: baseProductionCdnUrl + 'persona-female.png',
  personaMale: baseProductionCdnUrl + 'persona-male.png'
};
const examplePersona = (image: boolean) => ({
  imageUrl: image ? TestImages.personaFemale : undefined,
  imageInitials: 'AL',
  text: 'Annie Lindqvist',
  secondaryText: 'SR DIR, BUSINESS STRATEGY MGM',
  tertiaryText: '34/5676'
});

export default class ExampleComponent extends React.Component<Props> {
  render() {


    return (
      <>
        <FindYourContact
          person={examplePersona(true)}
          peopleList={[examplePersona(true), examplePersona(true)]}
          mostRecentlyUsed={[examplePersona(true), examplePersona(true)]}
          currentSelectedItems={[examplePersona(true)]}
        />
      </>
    )
  }
}
