export function trimAccountAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

export function parseArticleDataToSpeechSynthesisText(articleData) {
  const regex = /<.*?>/g;
  const text =
    `Article written and published by ${articleData?.author.name}. ` +
    articleData?.title +
    '. ' +
    articleData?.data.blocks
      .filter(
        (block) =>
          block.data.text ||
          block.data.caption ||
          block.type === 'checkbox' ||
          block.type === 'warning' ||
          block.type === 'nft' ||
          block.type === 'list',
      )
      .map((block) => {
        if (block.type === 'checkbox') {
          return block.data.items!.map((item) => {
            const mappedItem = item.text.replace(regex, '');
            if (item.checked) {
              return `${mappedItem}. check. `;
            }

            return mappedItem + '. ';
          });
        }

        if (block.type === 'nft') {
          return `NFT embed ${block.data.name?.replace(regex, '')}`;
        }

        if (block.type === 'quote') {
          return `${block.data.text?.replace(
            regex,
            '',
          )}, said ${block.data.caption?.replace(regex, '')}`;
        }

        if (block.type === 'list') {
          return block.data.items!.map((item, index) => {
            const mappedItem = item.replace(regex, '');
            if (block.data.type === 'ordered') {
              return `${index + 1}. ${mappedItem}. `;
            }

            return mappedItem;
          });
        }

        if (block.type === 'warning') {
          return block.data.title?.replace(regex, '');
        }

        if (block.data.text) {
          return block.data.text?.replace(regex, '');
        }

        if (block.data.caption) {
          return block.data.caption?.replace(regex, '');
        }

        return '';
      })
      .join('. ');

  return text;
}
