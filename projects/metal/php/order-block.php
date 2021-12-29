<div class="order-rest-button" onclick="cleanStorage();"><span class="rest-o">&#128465; &ensp;очистить заказ</span></div>

<div id="id-order-send" class="order-send">
    <div class="order-send-text-container">
        <div class="order-send-text">
            <div class="order-send-title">Ваш заказ отправлен.</div>
            <div class="order-send-slogan">С Вами свяжется первый освободившийся менеджер <br>для уточнения пунка выгрузки и размеров нарезки.</div>
            <div class="order-send-title">Спасибо за обращение!</div>
            <div class="order-send-button" onclick="orderSendPopup();">Продолжить</div>
        </div>
    </div>
</div>

<div class="order-block">
    <div class="order-container">
        <div class="order-wraper">
            <div class="order-header-block">
                <span class="order-h1">Для подтверждения заказа</span>
                <span class="order-h2">оставьте Ваши контакты.</span>
                <span class="order-h3">Менеджер Вам перезвонит</span>
                <span class="order-h4">для согласования доставки и размеров резки.</span>
            </div>
            <input id="id-order-input-tel" type="text" name="phone" placeholder="Ваш телефон">
            <button id="id-order-button" onclick="clickCheckOrder();"><b>ЗАКАЗАТЬ</b></button>
            <div class="order-total-block">
                <div class="order-total-price">Итоговая сумма заказа: <span id="id-obdh-s">0.00</span> BYN</div>
                <div class="order-total-weight">(общий вес <span id="id-obdh-w">0</span> кг)</div>
            </div>
        </div>
    </div>
</div>

<div class="order-bottom-divider"></div>