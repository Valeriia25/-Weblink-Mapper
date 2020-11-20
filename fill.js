$(window).load(() => {
    (function () {
        var nativeSetTimeout = window.setTimeout;

        window.bindTimeout = ((listener, interval) => {
            function setTimeout(code, delay) {
                var elapsed = 0,
                    h;

                h = window.setInterval(function () {
                    elapsed += interval;
                    if (elapsed < delay) {
                        listener(delay - elapsed);
                    } else {
                        window.clearInterval(h);
                    }
                }, interval);

                return nativeSetTimeout(code, 0);
            }

            window.setTimeout = setTimeout;
            setTimeout._native = nativeSetTimeout;
        });
    }());
    window.bindTimeout( () => {}, 0);
    window.setTimeout(() => {}, 0);

    if (sessionStorage.getItem('firstClick') === 'true') {
        checkForm();
        outputTable(data.workers);
    }

    $("button.MuiFab-root:contains('Fill')").click(() => {
        if (sessionStorage.getItem('firstClick') === 'true') {
            location.reload()
        } else {
            sessionStorage.setItem('firstClick', 'true');
            checkForm();
            outputTable(data.workers);
        }
    })

    document.querySelector('.MuiTableBody-root').addEventListener('click',(e) => {
        let id = e.target.classList[e.target.classList.length - 1];
        const needToDeletEl = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[id];
        needToDeletEl.parentNode.removeChild(needToDeletEl);
        workers.splice(id, 1);
        outputTable(workers);
    });

    $("button.MuiButton-root:contains('Check Form')").click(() => {
        if (workers) {
            const delErrElement = document.getElementsByClassName('MuiTableContainer-root')
                let observer = new MutationObserver(mutations => {
                    let addedNodesElement = mutations[0].addedNodes[0];
                    if (addedNodesElement) {
                        addedNodesElement.style.display = 'none'
                    }
                });
                observer.observe(delErrElement[0], {childList: true});
        }
        checkForm();
    })

    function checkForm() {
        const fieldsList = this.document.getElementsByTagName('input');
        const fieldsCount = fieldsList.length;

        for (let i = 0; i <= fieldsCount; i++) {
            if (fieldsList[i]) {
                const field = fieldsList[i];
                const inputLabel = field.parentElement.parentElement.firstElementChild;
                const fieldName = field.parentElement.parentElement.firstElementChild.innerHTML;

                switch (fieldName) {
                    case 'Name':
                        if (data.name !== null) {
                            field.setAttribute('value', data.name)
                            inputLabel.classList.add('MuiInputLabel-shrink', 'MuiFormLabel-filled')
                        }
                        break;
                    case 'Email':
                        if (data.email !== null) {
                            field.setAttribute('value', data.email)
                            inputLabel.classList.add('MuiInputLabel-shrink', 'MuiFormLabel-filled')
                        }
                        break;
                    case 'Primary phone':
                        if (data.firstPhone !== null) {
                            field.setAttribute('value', `(${data.firstPhone.slice(0,3)}) ${data.firstPhone.slice(3,7)}-${data.firstPhone.slice(7,9)}-${data.firstPhone.slice(9,11)}`)
                            inputLabel.classList.add('MuiInputLabel-shrink', 'MuiFormLabel-filled')
                        }
                        break;
                    case 'Secondary phone':
                        if (data.secondaryPhone !== null) {
                            field.setAttribute('value', `(${data.secondaryPhone.slice(0, 3)}) ${data.secondaryPhone.slice(3, 7)}-${data.secondaryPhone.slice(7, 9)}-${data.secondaryPhone.slice(9, 11)}`)
                            inputLabel.classList.add('MuiInputLabel-shrink', 'MuiFormLabel-filled')
                        }
                        break;
                    case 'Business Description':
                        if (data.desc !== null) {
                            field.setAttribute('value', data.desc)
                            inputLabel.classList.add('MuiInputLabel-shrink', 'MuiFormLabel-filled')
                        }
                        break;
                    default:
                        break
                }
            }
        }
    }

    function createEl(el) {
        return document.createElement(el)
    }

    var workers;

    function outputTable(dataList) {
        if (dataList.length > 0 ) {
            while (document.getElementsByTagName('tbody')[0].getElementsByTagName('tr').length > 0) {
                document.getElementsByTagName('tbody')[0].deleteRow(0);
            }

            workers = dataList;

            const tbody = document.getElementsByTagName('tbody')

            for (let j = 0; j < workers.length; j++) {
                const [
                    row, th, tdDob, tdJob,
                    tdExperience, tdGender,
                    tdDelete
                ] = [
                    createEl('tr'), createEl('th'),
                    createEl('td'), createEl('td'),
                    createEl('td'), createEl('td'),
                    createEl('td')
                ]
                const tableEls = [
                    row, th, tdDob, tdJob,
                    tdExperience, tdGender,
                    tdDelete
                ]

                th.appendChild(document.createTextNode(`${workers[j].firstName ? workers[j].firstName : ''} ${workers[j].lastName ? workers[j].lastName : ''}`))
                tdDob.appendChild(document.createTextNode(workers[j].dob ? workers[j].dob && workers[j].dob.replace(/-/gi, '/') : '-'))
                tdJob.appendChild(document.createTextNode(workers[j].job ? workers[j].job : '-'))
                tdExperience.appendChild(document.createTextNode(workers[j].experience ? workers[j].experience : '-'))
                tdGender.appendChild(document.createTextNode(workers[j].gender ? workers[j].gender : '-'))
                tdDelete.innerHTML = `<div class="MuiBox-root jss26 ${j}"><svg class="MuiSvgIcon-root jss2 ${j}" style="fill: #f44336; width: 24px" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path class="${j}" d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg></div>`

                for (let k = 1; k < tableEls.length; k++) {
                    row.appendChild(tableEls[k])
                }

                tbody[0].appendChild(row);

                tableEls.forEach((el, i) => {
                    if (i === 0) {
                        el.classList.add('MuiTableRow-root')
                    } else if (i === 1) {
                        el.classList.add('MuiTableCell-root', 'MuiTableCell-body', 'MuiTableCell-sizeSmall')
                    } else {
                        el.classList.add('MuiTableCell-root', 'MuiTableCell-body', 'MuiTableCell-alignRight', 'MuiTableCell-sizeSmall')
                    }
                })
            }
        }
    }
})

