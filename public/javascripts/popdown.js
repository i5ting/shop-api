$.popdown = function (modal, removeOnClose) {
    if (typeof removeOnClose === 'undefined') removeOnClose = true;
    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
        var _modal = document.createElement('div');
        _modal.innerHTML = modal.trim();
        if (_modal.childNodes.length > 0) {
            modal = _modal.childNodes[0];
            if (removeOnClose) modal.classList.add('remove-on-close');
            $(defaults.modalContainer).append(modal);
        }
        else return false; //nothing found
    }
    modal = $(modal);
    if (modal.length === 0) return false;
    modal.show();
    if (modal.find('.' + defaults.viewClass).length > 0) {
        $.sizeNavbars(modal.find('.' + defaults.viewClass)[0]);
    }
    $.openModal(modal);
 
    return modal[0];
};